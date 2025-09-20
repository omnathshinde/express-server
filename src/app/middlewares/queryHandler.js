import { Op } from "sequelize";

class WhereBuilder {
	constructor() {
		this.where = {};
		this.active = true;
		this.offset = 0;
		this.limit = null;
		this.order = [["createdAt", "DESC"]];
	}

	like(key, value) {
		if (value !== undefined && value !== null) {
			this.where[key] = { [Op.like]: `%${value}%` };
		}
		return this;
	}

	equal(key, value) {
		if (value !== undefined && value !== null && value !== "") {
			this.where[key] = { [Op.eq]: value };
		}
		return this;
	}

	between(key, from, to) {
		if (from && to) {
			this.where[key] = { [Op.between]: [from, to] };
		}
		return this;
	}

	// status(status) {
	// 	if (status !== "" || status == 1 || status === true || status === "true") {
	// 		this.where["deletedAt"] = { [Op.is]: null };
	// 		this.active = true;
	// 	} else if (status !== "" || status == 0 || status === false || status === "false") {
	// 		this.where["deletedAt"] = { [Op.not]: null };
	// 		this.active = false;
	// 	} else {
	// 		this.active = true;
	// 	}
	// 	return this;
	// }

	status(status) {
		if (status == 1 || status === true || status === "true") {
			this.where["deletedAt"] = { [Op.is]: null };
			this.active = true;
		} else if (status == 0 || status === false || status === "false") {
			this.where["deletedAt"] = { [Op.not]: null };
			this.active = false;
		} else {
			this.active = false;
		}
		return this;
	}

	paginate(offset = 0, limit) {
		this.offset = Math.max(0, parseInt(offset, 10) || 0);
		this.limit = limit !== undefined ? Math.max(1, parseInt(limit, 10)) : null;
		return this;
	}

	orderBy(column = "createdAt", direction = "DESC") {
		if (column) {
			this.order.push([column, direction.toUpperCase()]);
		}
		return this;
	}

	toJSON() {
		return { where: this.where };
	}

	toQueryOptions() {
		return {
			...this.toJSON(),
			order: this.order,
			limit: this.limit,
			offset: this.offset,
			paranoid: this.active,
			raw: true,
		};
	}
}

export default (req, res, next) => {
	req.queryBuilder = new WhereBuilder();
	next();
};

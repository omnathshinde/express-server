import { DataTypes } from "sequelize";

import asyncLocalStorage from "#constants/asyncLocalStorage.js";

const getCurrentUser = () => asyncLocalStorage.getStore()?.user ?? "system";

export default async (sequelize) => {
	sequelize.beforeDefine((attributes) => {
		attributes.createdBy = {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "system",
		};
		attributes.updatedBy = {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "system",
		};
		attributes.deletedBy = { type: DataTypes.STRING, allowNull: true };
	});

	sequelize.addHook("beforeCreate", (instance) => {
		const who = getCurrentUser();
		instance.createdBy = who;
		instance.updatedBy = who;
	});

	sequelize.addHook("beforeBulkCreate", (instances) => {
		const who = getCurrentUser();
		for (const instance of instances) {
			instance.createdBy = who;
			instance.updatedBy = who;
		}
	});

	sequelize.addHook("beforeUpdate", (instance) => {
		instance.updatedBy = getCurrentUser();
	});

	sequelize.addHook("beforeBulkUpdate", async (options) => {
		options.attributes ??= {};
		options.attributes.updatedBy = getCurrentUser();
	});

	sequelize.addHook("beforeDestroy", async (instance) => {
		instance.deletedBy = getCurrentUser();
		await instance.save({ hooks: false, silent: true });
	});

	sequelize.addHook("beforeBulkDestroy", (options) => {
		options.individualHooks = true;
	});

	sequelize.addHook("afterRestore", async (instance, options) => {
		if (instance.constructor?.options?.paranoid) {
			instance.deletedBy = null;
			instance.updatedBy = getCurrentUser();
			await instance.save({
				hooks: false,
				silent: true,
				transaction: options?.transaction,
			});
		}
	});

	sequelize.addHook("beforeBulkRestore", (options) => {
		options.individualHooks = true;
	});
};

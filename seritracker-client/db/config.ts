import { column, defineDb, defineTable } from "astro:db"

const User = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
	},
})

const Watchlist = defineTable({
	columns: {
		userId: column.number({ unique: true, references: () => User.columns.id }),
		malId: column.number({ unique: true }),
		malItem: column.json({
			default: {},
		}),
	},
})

const Watching = defineTable({
	columns: {
		userId: column.number({ unique: true, references: () => User.columns.id }),
		malId: column.number({ unique: true }),
		malItem: column.json({
			default: {},
		}),
	},
})

const Finished = defineTable({
	columns: {
		userId: column.number({ unique: true, references: () => User.columns.id }),
		malId: column.number({ unique: true }),
		malItem: column.json({
			default: {},
		}),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: { User, Watching, Watchlist, Finished },
})

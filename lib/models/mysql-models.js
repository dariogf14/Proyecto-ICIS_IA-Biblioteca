import { DataTypes } from "sequelize";
import sequelize from "../mysql";

export const Author = sequelize.define("Author", {
  name: { type: DataTypes.STRING(120), allowNull: false },
  country: { type: DataTypes.STRING(80), allowNull: false }
}, { tableName: "authors", timestamps: false });

export const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING(80), allowNull: false },
  description: { type: DataTypes.STRING(200), allowNull: false }
}, { tableName: "categories", timestamps: false });

export const Member = sequelize.define("Member", {
  name: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(30), allowNull: false }
}, { tableName: "members", timestamps: false });

export const Book = sequelize.define("Book", {
  title: { type: DataTypes.STRING(160), allowNull: false },
  isbn: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  year: { type: DataTypes.INTEGER, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: "books", timestamps: false });

export const Loan = sequelize.define("Loan", {
  loanDate: { type: DataTypes.DATEONLY, allowNull: false },
  returnDate: { type: DataTypes.DATEONLY, allowNull: true },
  status: { type: DataTypes.ENUM("activo", "devuelto"), defaultValue: "activo" }
}, { tableName: "loans", timestamps: false });

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });
Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, { foreignKey: "categoryId" });
Member.hasMany(Loan, { foreignKey: "memberId" });
Loan.belongsTo(Member, { foreignKey: "memberId" });
Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

export async function syncDatabase() {
  // sincroniza modelos
  await sequelize.authenticate();
}

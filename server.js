import express from 'express'
import { Repository } from './lib/repository.js'
import { ResData } from './lib/resData.js'
import { UserEntity } from './entity/userEntity.js'
import { BookEntity } from './entity//bookEntity.js'
import { CategoryEntity } from './entity/categoryEntity.js'
import { OrderEntity } from './entity/orderEntity.js'
import { role } from './enum/role.enum.js'
import { errorHandler } from './lib/error.hendler.js'
import path from 'node:path'

const userDB = path.resolve('database', 'users.json')
const userRepo = new Repository(userDB)

const bookDB = path.resolve('database', 'books.json')
const bookRepo = new Repository(bookDB)

const categoryDB = path.resolve('database', 'categories.json')
const categoryRepo = new Repository(categoryDB)

const orderDB = path.resolve('database', 'orders.json')
const orderRepo = new Repository(orderDB)

const server = express()
server.use(express.json())


server.get('/users', async (req, res, next) => {
    try {
        const users = await userRepo.read()
        const response = new ResData(200, 'success', users)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }

})

server.post('/users', async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.name) {
            const response = new ResData(400, 'Name is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.name !== 'string' || body.name.trim().length === 0) {
            const response = new ResData(400, 'Name must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.email) {
            const response = new ResData(400, 'Email is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            const response = new ResData(400, 'Invalid email format!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.password) {
            const response = new ResData(400, 'Password is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.password !== 'string' || body.password.trim().length === 0) {
            const response = new ResData(400, 'Password must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!role.includes(body.role)) {
            const response = new ResData(400, 'Role must be USER, ADMIN, SELLER, AUTHOR')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const newUser = new UserEntity(body.name, body.email, body.password, body.role)
        const allData = await userRepo.read()
        allData.push(newUser)
        await userRepo.write(allData)
        const response = new ResData(201, 'Created User!', newUser)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = await userRepo.read()
        const user = allData.find((user) => user.id === id)
        if (!user) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success', user)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }

})

server.patch('/users/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const allData = await userRepo.read()
        const userIndex = allData.findIndex((user) => user.id === id)
        if (userIndex === -1) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.name) {
            const response = new ResData(400, 'Name is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.name !== 'string' || body.name.trim().length === 0) {
            const response = new ResData(400, 'Name must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.email) {
            const response = new ResData(400, 'Email is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            const response = new ResData(400, 'Invalid email format!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.password) {
            const response = new ResData(400, 'Password is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.password !== 'string' || body.password.trim().length === 0) {
            const response = new ResData(400, 'Password must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!role.includes(body.role)) {
            const response = new ResData(400, 'Role must be USER, ADMIN, SELLER, AUTHOR')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        allData[userIndex].name = body.name;
        allData[userIndex].email = body.email;
        allData[userIndex].password = body.password;
        allData[userIndex].role = body.role;
        await userRepo.write(allData)
        const updatedUser = allData[userIndex]
        const response = new ResData(200, 'User updated!', updatedUser)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.put('/users/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;

        const allData = (await userRepo.read()) || [];
        const userIndex = allData.findIndex((user) => user.id === id)

        if (userIndex === -1) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.name) {
            const response = new ResData(400, 'Name is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.name !== 'string' || body.name.trim().length === 0) {
            const response = new ResData(400, 'Name must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.email) {
            const response = new ResData(400, 'Email is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            const response = new ResData(400, 'Invalid email format!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.password) {
            const response = new ResData(400, 'Password is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.password !== 'string' || body.password.trim().length === 0) {
            const response = new ResData(400, 'Password must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!role.includes(body.role)) {
            const response = new ResData(400, 'Role must be USER, ADMIN, SELLER, AUTHOR')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        allData[userIndex].name = body.name;
        allData[userIndex].email = body.email;
        allData[userIndex].password = body.password;
        allData[userIndex].role = body.role;
        await userRepo.write(allData)
        const updatedUser = allData[userIndex]
        const response = new ResData(200, 'User updated!', updatedUser)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.delete('/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = (await userRepo.read()) || [];
        const userIndex = allData.findIndex((user) => user.id === id)
        if (userIndex === -1) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const deletedUser = allData.splice(userIndex, 1)[0]
        await userRepo.write(allData)
        const response = new ResData(200, 'User deleted!', deletedUser)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/users/:id/orders', async (req, res, next) => {
    try {
        const id = req.params.id;
        const orders = await orderRepo.read()
        const userOrders = orders.filter((u) => u.userID === id)
        if (userOrders.length === 0) {
            const response = new ResData(404, 'User orders not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success!', userOrders)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            const response = new ResData(400, 'Email is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const response = new ResData(400, 'Invalid email format!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!password) {
            const response = new ResData(400, 'Password is required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof password !== 'string' || password.trim().length === 0) {
            const response = new ResData(400, 'Password must be a valid string!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const allUsers = await userRepo.read()
        const user = allUsers.find((u) => u.email === email)

        if (!user) {
            const response = new ResData(401, 'Invalid email or password!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (user.password !== password) {
            const response = new ResData(401, 'Invalid email or password!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const { password: _, ...userWithoutPassword } = user;

        const response = new ResData(200, 'Login successful!', userWithoutPassword)
        res.status(response.statusCode)
        res.json(response)

    } catch (error) {
        next(error)
    }
})

server.get('/books', async (req, res, next) => {
    try {
        const books = await bookRepo.read()
        const response = new ResData(200, 'success', books)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.post('/books', async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.title) {
            const response = new ResData(400, 'Book title is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.title !== "string" || body.title.trim().length === 0) {
            const response = new ResData(400, 'Book title must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.author) {
            const response = new ResData(400, 'Book author is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.author !== "string" || body.author.trim().length === 0) {
            const response = new ResData(400, 'Book author must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.price) {
            const response = new ResData(400, 'Book price is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.price !== 'number' || body.price <= 0) {
            const response = new ResData(400, 'Book price must be typeof Number!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const allCategory = await categoryRepo.read()
        const category = allCategory.find((c) => c.id === body.categoryID)
        if (!category) {
            const response = new ResData(404, 'No category with such id found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.stock) {
            const response = new ResData(400, 'Book stock is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.stock !== 'number' || body.stock <= 0) {
            const response = new ResData(400, 'Book stock must be typeof Number!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const newBook = new BookEntity(body.title, body.author, body.price, body.categoryID, body.stock)
        const allData = await bookRepo.read()
        allData.push(newBook)
        await bookRepo.write(allData)
        const response = new ResData(201, 'Book created!', newBook)
        res.status(response.statusCode)
        res.json(response)
        return;
    } catch (error) {
        next(error)
    }
})

server.get('/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = await bookRepo.read()
        const book = allData.find((book) => book.id === id)
        if (!book) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success!', book)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.patch('/books/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const allData = await bookRepo.read()
        const bookIndex = allData.findIndex((b) => b.id === id)
        if (bookIndex === -1) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.title) {
            const response = new ResData(400, 'Book title is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.title !== "string" || body.title.trim().length === 0) {
            const response = new ResData(400, 'Book title must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.author) {
            const response = new ResData(400, 'Book author is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.author !== "string" || body.author.trim().length === 0) {
            const response = new ResData(400, 'Book author must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.price) {
            const response = new ResData(400, 'Book price is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.price !== 'number' || body.price <= 0) {
            const response = new ResData(400, 'Book price must be typeof Number!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const allCategory = await categoryRepo.read()
        const category = allCategory.find((c) => c.id === body.categoryID)
        if (!category) {
            const response = new ResData(404, 'No category with such id found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        allData[bookIndex].title = body.title;
        allData[bookIndex].author = body.author;
        allData[bookIndex].price = body.price;
        allData[bookIndex].categoryID = body.categoryID;

        const updatedBook = allData[bookIndex]
        await bookRepo.write(allData)
        const response = new ResData(200, 'Book title,author,price and categoryID update!', updatedBook)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.put('/books/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const allData = await bookRepo.read()
        const bookIndex = allData.findIndex((b) => b.id === id)
        if (bookIndex === -1) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.title) {
            const response = new ResData(400, 'Book title is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.title !== "string" || body.title.trim().length === 0) {
            const response = new ResData(400, 'Book title must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.author) {
            const response = new ResData(400, 'Book author is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.author !== "string" || body.author.trim().length === 0) {
            const response = new ResData(400, 'Book author must be typeof String!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.price) {
            const response = new ResData(400, 'Book price is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.price !== 'number' || body.price <= 0) {
            const response = new ResData(400, 'Book price must be typeof Number!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const allCategory = await categoryRepo.read()
        const category = allCategory.find((c) => c.id === body.categoryID)
        if (!category) {
            const response = new ResData(404, 'No category with such id found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.stock) {
            const response = new ResData(400, 'Book stock is required')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.stock !== 'number' || body.stock <= 0) {
            const response = new ResData(400, 'Book stock must be typeof Number!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        allData[bookIndex].title = body.title;
        allData[bookIndex].author = body.author;
        allData[bookIndex].price = body.price;
        allData[bookIndex].categoryID = body.categoryID;
        allData[bookIndex].stock = body.stock;

        const updatedBook = allData[bookIndex]
        await bookRepo.write(allData)
        const response = new ResData(200, 'Book title,author,price and categoryID update!', updatedBook)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.delete('/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = await bookRepo.read();
        const bookIndex = allData.findIndex((b) => b.id === id)
        if (bookIndex === -1) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const deletedBook = allData.splice(bookIndex, 1)[0]
        await bookRepo.write(allData)
        const response = new ResData(200, 'Book deleted!', deletedBook)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/categories', async (req, res, next) => {
    try {
        const allData = await categoryRepo.read()
        const response = new ResData(200, 'success!', allData)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/categories/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = await categoryRepo.read()
        const category = allData.find((c) => c.id === id)
        if (!category) {
            const response = new ResData(404, 'Category not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success!', category)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.post('/categories', async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.name) {
            const response = new ResData(400, 'Category name required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.name !== "string" || body.name.trim().length === 0) {
            const response = new ResData(400, 'Category name typeof String and must not be empty!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.description) {
            const response = new ResData(400, 'Category description required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.description !== "string" || body.description.trim().length === 0) {
            const response = new ResData(400, 'Category description typeof String and must not be empty!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const newCategory = new CategoryEntity(body.name, body.description)
        const allData = await categoryRepo.read()
        allData.push(newCategory)
        await categoryRepo.write(allData)
        const response = new ResData(201, 'Category created!', newCategory)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.patch('/categories/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const allData = await categoryRepo.read()
        const categoryIndex = allData.findIndex((c) => c.id === id)
        if (categoryIndex === -1) {
            const response = new ResData(404, 'Category not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.description) {
            const response = new ResData(400, 'Category description required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.description !== "string" || body.description.trim().length === 0) {
            const response = new ResData(400, 'Category description typeof String and must not be empty!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        allData[categoryIndex].description = body.description;
        const updatedCategory = allData[categoryIndex]
        await categoryRepo.write(allData)
        const response = new ResData(200, 'Category updated!', updatedCategory)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.put('/categories/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const allData = await categoryRepo.read()
        const categoryIndex = allData.findIndex((c) => c.id === id)
        if (categoryIndex === -1) {
            const response = new ResData(404, 'Category not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (!body.name) {
            const response = new ResData(400, 'Category name required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.name !== "string" || body.name.trim().length === 0) {
            const response = new ResData(400, 'Category name typeof String and must not be empty!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (!body.description) {
            const response = new ResData(400, 'Category description required!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        if (typeof body.description !== "string" || body.description.trim().length === 0) {
            const response = new ResData(400, 'Category description typeof String and must not be empty!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        allData[categoryIndex].description = body.description;
        allData[categoryIndex].name = body.name;
        const updatedCategory = allData[categoryIndex]
        await categoryRepo.write(allData)
        const response = new ResData(200, 'Category updated!', updatedCategory)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.delete('/categories/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = (await categoryRepo.read()) || []
        const categoryIndex = allData.findIndex((c) => c.id === id)
        if (categoryIndex === -1) {
            const response = new ResData(404, 'Category not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const deletedCategory = allData.splice(categoryIndex, 1)[0]
        await categoryRepo.write(allData)
        const response = new ResData(200, 'Category deleted!', deletedCategory)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/categories/:id/books', async (req, res, next) => {
    try {
        const id = req.params.id;
        const books = await bookRepo.read()
        const categoryBooks = books.filter((b) => b.categoryID === id)
        if (categoryBooks.length === 0) {
            const response = new ResData(404, 'Category books not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success!', categoryBooks)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/orders', async (req, res, next) => {
    try {
        const allData = await orderRepo.read()
        const response = new ResData(200, 'success!', allData)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.get('/orders/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allData = await orderRepo.read()
        const order = allData.find((o) => o.id === id)
        if (!order) {
            const response = new ResData(404, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const response = new ResData(200, 'success!', order)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.post('/orders', async (req, res, next) => {
    try {
        const body = req.body;
        const users = await userRepo.read()
        const user = users.find((u) => u.id === body.userID)
        if (!user) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const books = await bookRepo.read()
        const book = books.find((b) => b.id === body.bookID)
        if (!book) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (!body.quantity) {
            const response = new ResData(400, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (typeof body.quantity !== 'number' || body.quantity < 0) {
            const response = new ResData(400, 'amount is a positive number')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const newOrder = new OrderEntity(body.userID, body.bookID, body.quantity)
        const allData = await orderRepo.read()
        allData.push(newOrder)
        await orderRepo.write(allData)
        const response = new ResData(201, 'Created order!', newOrder)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.patch('/orders/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const orders = await orderRepo.read()
        const orderIndex = orders.findIndex((o) => o.id === id)
        if (orderIndex === -1) {
            const response = new ResData(404, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (!body.quantity) {
            const response = new ResData(400, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (typeof body.quantity !== 'number' || body.quantity < 0) {
            const response = new ResData(400, 'amount is a positive number')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        orders[orderIndex].quantity = body.quantity
        await orderRepo.write(orders)
        const updatedOrder = orders[orderIndex]
        const response = new ResData(200, 'Order quantity Updated!', updatedOrder)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.put('/orders/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const orders = await orderRepo.read()
        const orderIndex = orders.findIndex((o) => o.id === id)
        if (orderIndex === -1) {
            const response = new ResData(404, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const users = await userRepo.read()
        const user = users.find((u) => u.id === body.userID)
        if (!user) {
            const response = new ResData(404, 'User not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }

        const books = await bookRepo.read()
        const book = books.find((b) => b.id === body.bookID)
        if (!book) {
            const response = new ResData(404, 'Book not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (!body.quantity) {
            const response = new ResData(400, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        if (typeof body.quantity !== 'number' || body.quantity < 0) {
            const response = new ResData(400, 'amount is a positive number')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        orders[orderIndex].userID = body.userID;
        orders[orderIndex].bookID = body.bookID;
        orders[orderIndex].quantity = body.quantity;

        const updatedOrder = orders[orderIndex]
        await orderRepo.write(orders)
        const response = new ResData(200, 'Order quantity Updated!', updatedOrder)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.delete('/orders/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const orders = await orderRepo.read()
        const orderIndex = orders.findIndex((o) => o.id === id)
        if (orderIndex === -1) {
            const response = new ResData(404, 'Order not found!')
            res.status(response.statusCode)
            res.json(response)
            return;
        }
        const deletedOrder = orders.splice(orderIndex, 1)[0]
        await orderRepo.write(orders)
        const response = new ResData(200, 'Order deleted!', deletedOrder)
        res.status(response.statusCode)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

server.use(errorHandler)

server.listen(2025, () => {
    console.log("Server running on http://localhost:2025")
})
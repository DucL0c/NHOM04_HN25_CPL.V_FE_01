// src/services/bookService.ts
import dataService from "./dataService";

export const getBooks = () => dataService.get("/books");
export const getBookById = (id: string) => dataService.get(`/books/${id}`);
export const createBook = (data: any) => dataService.post("/books", data);
export const updateBook = (id: string, data: any) => dataService.put(`/books/${id}`, data);
export const deleteBook = (id: string) => dataService.delete(`/books/${id}`);

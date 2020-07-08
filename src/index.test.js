import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import regeneratorRuntime from "regenerator-runtime";

import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom 
let container

describe('index.html', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body
    })

    it('renders a title element', () => {
        expect(container.getElementsByClassName('title')[0]).not.toBeNull()
    })

    it('renders a div wrapper', () => {
        expect(container.getElementsByClassName('page-div')[0]).not.toBeNull()
    })

    it('renders a dog div', () => {
        expect(container.getElementsByClassName('dog-div')[0]).not.toBeNull()
    })

    it('renders image', () => {
        expect(container.getElementsByClassName('pet-img')[9]).not.toBeNull()
    })

    it('renders 10 images', () => {
        expect(container.getElementsByClassName('pet-img')[9]).not.toBeNull()
    })

    it('renders a modal', () => {
        expect(container.getElementsByClassName('modal')[0]).not.toBeNull()
    })
})
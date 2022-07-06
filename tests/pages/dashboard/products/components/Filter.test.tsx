import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Filter from "../../../../../components/Filter";


describe("Filter", () => {
    it("renders", async () => {
        render(<Filter onFilterByTittle={()=>{}} onShowOnlyFeatured={()=>{}} />)

        const filterInput = await screen.findByText('Show featured products only')

        expect(filterInput).toBeInTheDocument()
    })

    it("selecting show only featured triggers the callback", async () => {
        const handleShowOnlyFeatured = jest.fn()
        render(<Filter onFilterByTittle={()=>{}} onShowOnlyFeatured={handleShowOnlyFeatured} />)

        const filterInput = await screen.findByText('Show featured products only')
        await filterInput.click()
        expect(handleShowOnlyFeatured).toHaveBeenCalled()
    })

    it("filtering by title triggers the callback", async () => {
        const handleFilterByTittle = jest.fn()
        render(<Filter onFilterByTittle={handleFilterByTittle} onShowOnlyFeatured={() => {}} />)

        const filterInput = await screen.findByPlaceholderText('Filter by name')
        await fireEvent.change(filterInput, {target: { value: 'test' }})
        expect(handleFilterByTittle).toHaveBeenCalled()
    })
})

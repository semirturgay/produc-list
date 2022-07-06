import type {NextPage} from 'next'
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Flex,
    Spinner
} from "@chakra-ui/react";
import {Column} from "react-table";

import useProductList from "../../../hooks/useProductList";
import Filter from "../../../components/Filter";
import CustomTable from "../../../components/Table";


export type Product = {
    "ID": number,
    "Type": string,
    "SKU": string,
    "Name": string,
    "Published": string,
    "Is featured?": number
}

const columns: Column<Product>[] = [
    {
        accessor: 'ID',
        Header: "ID"
    },
    {
        accessor: 'Name',
        Header: "Name"
    },
    {
        accessor: 'Published',
        Header: "Is published ?"
    },
    {
        accessor: 'Is featured?',
        Header: "Is featured?"
    },
    {
        accessor: 'Type',
        Header: "Type"

    },
    {
        accessor: 'SKU',
        Header: "SKU"
    },
]


const ProductList: NextPage & { auth: boolean } = () => {

    const {data, isLoading} = useProductList()
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)
    const [titleFilter, setTittleFilter] = useState<undefined | string>(undefined)
    const [filteredData, setFilteredData] = useState<undefined | any>([])

    useEffect(() => {
        if (data) {
            setFilteredData(data)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            let filteredData = [];
            if (titleFilter) {
                filteredData = data?.filter((product: Product) => product["Name"].toLowerCase().includes(('' + titleFilter).toLowerCase()))
            } else {
                filteredData = data
            }
            if (showOnlyFeatured) {
                filteredData = filteredData.filter((product: Product) => Boolean(product["Is featured?"]) === showOnlyFeatured)
            }
            setFilteredData(filteredData)
        }
    }, [titleFilter, showOnlyFeatured])


    const handleFilterByTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTittleFilter(event.currentTarget.value)
    }

    const handleShowOnlyFeatured = (event: ChangeEvent<HTMLInputElement>) => {
        setShowOnlyFeatured(event.currentTarget.checked)
    }

    if (isLoading) return <Flex align="center" justify="center" padding={20}>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </Flex>

    return (
        <>
            <Filter onFilterByTittle={handleFilterByTitle} onShowOnlyFeatured={handleShowOnlyFeatured}/>
            <CustomTable columns={columns} data={filteredData}/>
        </>
    );
}

ProductList.auth = true

export default ProductList

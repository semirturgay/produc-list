import React from "react";
import {
    useTable,
    usePagination,
    TableInstance,
    Column,
} from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    IconButton,
    Text,
    Tooltip,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";

import {Product} from "../index";

const CustomTable = ({columns, data}: { columns: Column<Product>[], data: Product[] }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headers,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    }: TableInstance<Product> = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0}
        },
        usePagination
    );

    return (
        <>
            <Table {...getTableProps()}>
                <Thead>
                    <Tr>
                        {headers.map((column) => (
                            // eslint-disable-next-line react/jsx-key
                            <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <Tr {...row.getRowProps()} >
                                {row.cells.map((cell) => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>

            <Flex justifyContent="space-between" m={4} alignItems="center">
                <Flex>
                    <Tooltip label="First Page">
                        <IconButton
                            aria-label="First Page"
                            onClick={() => gotoPage(0)}
                            isDisabled={!canPreviousPage}
                            icon={<ArrowLeftIcon h={3} w={3}/>}
                            mr={4}
                        />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            aria-label="Previous Page"
                            onClick={previousPage}
                            isDisabled={!canPreviousPage}
                            icon={<ChevronLeftIcon h={6} w={6}/>}
                        />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center">
                    <Text flexShrink="0" mr={8}>
                        Page{" "}
                        <Text fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                    </Text>
                    <Text flexShrink="0">Go to page:</Text>{" "}
                    <NumberInput
                        ml={2}
                        mr={8}
                        w={28}
                        min={1}
                        max={pageOptions.length}
                        onChange={(value) => {
                            const page = value ? parseInt(value) - 1 : 0;
                            gotoPage(page);
                        }}
                        defaultValue={pageIndex + 1}
                    >
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        w={32}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex>
                    <Tooltip label="Next Page">
                        <IconButton
                            aria-label="Next Page"
                            onClick={nextPage}
                            isDisabled={!canNextPage}
                            icon={<ChevronRightIcon h={6} w={6}/>}
                        />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            aria-label="Last Page"
                            onClick={() => gotoPage(pageCount - 1)}
                            isDisabled={!canNextPage}
                            icon={<ArrowRightIcon h={3} w={3}/>}
                            ml={4}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
}

export default CustomTable

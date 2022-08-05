import React from "react";
import NewLifterRow from "./NewLifterRow";
import { useSelector, useDispatch } from "react-redux";
import { addDefaultLifter } from "../features/competitionData/competitionDataSlice";

const TABLE_HEADINGS = ['Name', 'Sex', 'Weight','Squat', 'Bench', 'Deadlift', 'DOTS']
const HEADING_SPANS = [1,1,1,3,3,3,1]

export default function NewLifterTable() {

    const competitionData = useSelector((state) => state.competitionData)
    const dispatch = useDispatch()

    function generateTableHeadings() {
        return TABLE_HEADINGS.map((hdr, idx) => <th colSpan = {HEADING_SPANS[idx]} > {hdr} </th>)
    }

    function generateTableRows() {
        return competitionData.lifters.map(lifter => <NewLifterRow lifter = {lifter}/>)
    }

    return <>
        <table>
            <thead>
                {generateTableHeadings()}
            </thead>
            <tbody>
                {generateTableRows()}
            </tbody>
        </table>
        <button
            style = {{width: "100px", height: "100px"}}
            onClick = {() => dispatch(addDefaultLifter())}
        > 
        Add Lifter </button>
    </>


}
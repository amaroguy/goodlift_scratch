import React from "react";
import NewLifterRow from "./NewLifterRow";
import { useSelector, useDispatch } from "react-redux";
import { addDefaultLifter } from "../features/competitionData/competitionDataSlice";
import { v4 as uuid } from "uuid";
import LifterTableNav from "./LifterTableNav";

const TABLE_HEADINGS = ['Name', 'Sex', 'Weight','Squat', 'Bench', 'Deadlift', 'DOTS']
const HEADING_SPANS = [1,1,1,3,3,3,1]

export default function NewLifterTable() {

    const competitionData = useSelector((state) => state.competitionData)
    const dispatch = useDispatch()

    let displayedLifterName = competitionData.displayedLift.lifterID === -1 ? 'N/A' :
        competitionData.lifters.find(lifter => competitionData.displayedLift.lifterID === lifter.id).name

    function generateTableHeadings() {
        return TABLE_HEADINGS.map((hdr, idx) => <th colSpan = {HEADING_SPANS[idx]} > {hdr} </th>)
    }

    const zaza = {height: "300px", width: "300px"}

    function generateTableRows() {
        return competitionData.lifters.map(lifter => <NewLifterRow lifter = {lifter}/>)
    }


    return <>
        <LifterTableNav displayedLifterName={displayedLifterName} />
        <table>
            <tbody>
                <tr>
                    {generateTableHeadings()}
                </tr>
                {generateTableRows()}
            </tbody>
        </table>
        <button onClick = {() => dispatch(addDefaultLifter())} className = "general-button"> Add a new lifter </button>
    </>


}
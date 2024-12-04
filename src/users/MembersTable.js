import React, {useEffect, useState} from 'react';
import {ApiGet}  from '../utils/Api.js';
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayMembersTable() {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await ApiGet('https://hp-api.herokuapp.com/api/characters');
            setMembers(result);
        }
        fetchData();
    }, []);

return (
    <div>
        <h1>Seznam členů</h1>
        <table className='table table-dark table-striped table-bordered table-sm'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>JMÉNO</th>
                    <th>POHLAVÍ</th>
                    <th>DATUM NAROZENÍ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4} className='table-light'></td>

                </tr>
                {members.map((member, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{member.name}</td>
                        <td>{member.gender}</td>
                        <td>{member.dateOfBirth}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
)
}
export default DisplayMembersTable;
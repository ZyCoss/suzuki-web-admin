import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { homeAPI } from '@/config';

const ColorSelector = ({ selectedColours, setSelectedColours }) => {

    let [colors, setColors] = useState([]);

    useEffect(() => {
        const getColors = async () => {
            try {
                const result = await axios.get(homeAPI + '/color/get-all');
                setColors(result.data);
                console.log(colors);
            } catch (err) {
                console.log(err);
            }
        }
        getColors()
    }, [])

    return (
        <div className="colour-box" suppressHydrationWarning={true}>
            <label htmlFor="enter-color" className="fw-bold">Màu:</label>
            <Multiselect
                options={colors}
                selectedValues={selectedColours}
                onSelect={setSelectedColours}
                onRemove={setSelectedColours}
                displayValue="name"
                hidePlaceholder={true}
                disable={true}
            />
        </div>
    )
}

export default ColorSelector
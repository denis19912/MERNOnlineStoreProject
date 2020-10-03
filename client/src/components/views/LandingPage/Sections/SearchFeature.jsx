import React from 'react'

import { Input } from 'antd';
import Search from 'antd/lib/input/Search';
import { useState } from 'react';
function SearchFeature(props) {
    const [SearchTerms, setSearchTerms] = useState("");

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value);
    }
    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search by title..." />
        </div>
    )
}

export default SearchFeature

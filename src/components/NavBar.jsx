import React, { Component } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';

function NavBar(props) {
    //--------------------------------------------------------------STATES----------------------------------------------------------------------------------------
    console.log('----- RENDER NavBar -----')
    const [timePeriod, setTimePeriod] = useState(7);
    const [cryptoCurrency, setCryptoCurrency] = useState('Bitcoin');
    const [realWorldCurrency, setRealWorldCurrency] = useState('US Dollar');
    const [value, setValue] = useState('');
    //--------------------------------------------------------------GETTING CRYPTO DATA---------------------------------------------------------------------------
    function getTimePeriod(event) {
        setTimePeriod(event.currentTarget.id);
    }

    function getCryptoCurrency(event) {
        setCryptoCurrency(event.currentTarget.id);
    }

    function getRealWorldCurrency(event) {
        setRealWorldCurrency(event.currentTarget.id);
    }
    //--------------------------------------------------------------SEARCH SUGGESTIONS------------------------------------------------------------------------------
    function handleChange(event) {
        setValue(event.target.value)
    }

    function onSearch(searchTerm) {
        setValue(searchTerm);
        if (value !== '') {
            setCryptoCurrency(searchTerm);
        }

    }
    const searchList = props.crypto.filter((coin) => {
        const searchTerm = value.toLowerCase();
        const cryptoName = coin.name.toLowerCase();
        return (searchTerm && cryptoName.startsWith(searchTerm) && cryptoName !== searchTerm);
    }).map((coin) => (
        <div onClick={() => onSearch(coin.name)} className="dropdown-row" key={coin.id}> {coin.name} </div>
    ));
    //--------------------------------------------------------------DROPDOWN----------------------------------------------------------------------------------------
    const cryptoList = props.crypto.map((coin) =>
        < NavDropdown.Item key={coin.id} id={coin.name} onClick={getCryptoCurrency}> {coin.name} </NavDropdown.Item >
    );

    const currencyList = props.currencies.map((currency) =>
        <NavDropdown.Item key={currency.id} id={currency.name} onClick={getRealWorldCurrency}> {currency.name} </NavDropdown.Item>
    );
    //--------------------------------------------------------------RENDER NAVBAR------------------------------------------------------------------------------------
    useEffect(() => {
        console.log(`SENDING TO PARENT days: ${timePeriod} coin: ${cryptoCurrency} exchange: ${realWorldCurrency}`)
        return props.sendDataToParent(timePeriod, cryptoCurrency, realWorldCurrency);
    })

    return (
        <>
            <Navbar bg="dark" expand="lg" variant='dark' sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#">Crypto Stock</Navbar.Brand>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '500px' }}>
                        <Nav.Link id='5' onClick={getTimePeriod}>5 Days</Nav.Link>
                        <Nav.Link id='30' onClick={getTimePeriod}>1 Month</Nav.Link>
                        <Nav.Link id='180' onClick={getTimePeriod}>6 Months</Nav.Link>
                        <Nav.Link id='360' onClick={getTimePeriod}>1 Year</Nav.Link>
                        <Nav.Link id='1800' onClick={getTimePeriod}>5 Years</Nav.Link>
                        <Nav.Link id='max' onClick={getTimePeriod}>MAX</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic"> {cryptoCurrency} </Dropdown.Toggle>
                            <Dropdown.Menu style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '200px' }}>
                                {cryptoList}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown style={{ paddingLeft: '10px' }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic"> {realWorldCurrency} </Dropdown.Toggle>
                            <Dropdown.Menu style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '200px' }}>
                                {currencyList}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={value}
                            onChange={handleChange}
                            onClick={() => onSearch(value)}
                        />
                        <Button variant="outline-success" onClick={() => onSearch(value)}>Search</Button>
                    </Form>
                </Container>
            </Navbar>
            <div className="dropDown">
                {searchList}
            </div>
        </>
    );
}

export default NavBar

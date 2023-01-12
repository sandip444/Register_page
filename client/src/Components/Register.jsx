import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        latitude: '',
        longitude: '',
        image: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e) => {
        setFormData(() => ({
            ...formData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to the server here
        try {
            const formDataWithLatLong = {
                ...formData, 
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
 }

            // // Make a POST request to the server with the form data
            const response = await axios.post('http://localhost:5000/registrations', formDataWithLatLong);
            console.log(response.data.image);
        } catch (error) {
            console.error(error);
        
    };
}

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            /><br />

            <label htmlFor="mobile">Mobile:</label>
            <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
            /><br />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            /><br />

            <label htmlFor="address">Address:</label>
            <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            /><br />

            <label htmlFor="latitude">Latitude:</label>
            <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
            /><br />

            <label htmlFor="longitude">Longitude:</label>
            <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
            /><br />

            <label htmlFor="image">Image:</label>
            <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
            /><br />

            <input type="submit" value="Save" />
        </form>
    );
}

export default RegisterForm;

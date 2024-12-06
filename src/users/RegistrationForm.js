import { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/cs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import LoginForm from './LoginForm';
import { useCookies } from 'react-cookie';

function RegistrationForm() {
    const [cookies, setCookie] = useCookies(['nickName', 'email', 'password', 'birthValue']);
    const [birthValue, setBirthValue] = useState(cookies.birthValue ? dayjs(cookies.birthValue) : dayjs().subtract(18, 'year'));
    const todayMinus18Years = dayjs().subtract(18, 'year');
    const [isRegistered, setIsRegistered] = useState(false);
    const [formInputValues, setFormInputValues] = useState({
        nickName: cookies.nickName || '',
        email: cookies.email || '',
        password: cookies.password || '',
        birthValue: cookies.birthValue || (birthValue ? birthValue.format('YYYY-MM-DD') : '')
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:8080/api/user-rg', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInputValues)
          });
      
          if (!response.ok) {
            throw new Error('Chyba při registraci');
          }
      
          // Zpracovat úspěšnou odpověď
          console.log('Registrace proběhla úspěšně');
          
          // Set cookies for each form input value
          setCookie('nickName', formInputValues.nickName, { path: '/' });
          setCookie('email', formInputValues.email, { path: '/' });
          setCookie('password', formInputValues.password, { path: '/' });
          setCookie('birthValue', formInputValues.birthValue, { path: '/' });
      
        } catch (error) {
          // Zpracovat chybu při odesílání dat
          console.error('Chyba při registraci:', error);
        }
        setIsRegistered(true);
      };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormInputValues({
            ...formInputValues,
            [name]: value
        });
    };

    const handleDateChange = (newValue) => {
        const newDate = newValue.date(15); // Set the day to 15
        setBirthValue(newDate);
        setFormInputValues({
            ...formInputValues,
            birthValue: newDate ? newDate.format('YYYY-MM-DD') : ''
        });
    };
    

    if (isRegistered) {
        return <LoginForm />;
    }

    return (
        <div>
            <div className="border border-primary rounded col-3 offset-5 m-auto mt-3 mb-3 bg-primary text-white">
                <h1><u>Registrace</u></h1>
                <form className="m-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nickName">Přezdívka</label>
                        <input
                            type="text"
                            className="form-control text-center-placeholder"
                            id="nickName"
                            name="nickName"
                            value={formInputValues.nickName}
                            onChange={handleInputChange}
                            placeholder="Petr012"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control text-center-placeholder"
                            id="email"
                            name="email"
                            value={formInputValues.email}
                            onChange={handleInputChange}
                            placeholder="petr.novak@gamil.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            className="form-control text-center-placeholder"
                            id="password"
                            name="password"
                            value={formInputValues.password}
                            onChange={handleInputChange}
                            placeholder="**********"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="birthYear">Rok a měsíc narození</label><br />
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            adapterLocale="cs">
                            <Box> 
                                <DatePicker className="form-control"
                                    views={['year', 'month']}
                                    value={birthValue}
                                    onChange={handleDateChange}
                                    minDate={dayjs().subtract(80, 'year')}
                                    maxDate={todayMinus18Years}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="form-control"
                                            value={birthValue ? birthValue.format('YYYY-MM-DD') : ''}
                                        />
                                    )}
                                />
                            </Box>
                        </LocalizationProvider>
                    </div>
                    
                    <button type="submit" className="btn btn-light m-1"><b>Registrovat se</b></button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
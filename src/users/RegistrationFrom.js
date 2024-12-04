import { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/cs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import LoginForm from './LoginForm';

function RegistrationForm() {
    const [birthValue, setBirthValue] = useState(null);
    const todayMinus18Years = dayjs().subtract(18, 'year');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsRegistered(true);
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
                            id="myInput"
                            name="nickName"
                            placeholder="Petr012"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control text-center-placeholder"
                            id="myInput"
                            name="email"
                            placeholder="petr.novak@gamil.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            className="form-control text-center-placeholder"
                            id="myInput"
                            name="password"
                            placeholder="**********"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthYear">Rok a měsíc narození</label><br />
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            adapterLocale="cs">
                            <Box> 
                                <DateField value={birthValue} className="bg-white rounded"/>
                                <Box className="m-2 ">
                                    <StaticDatePicker className="text-gray border rounded"
                                        localeText={{ toolbarTitle: "Vyberte datum:" }}
                                        defaultValue={todayMinus18Years}
                                        minDate={dayjs().subtract(80, 'year')}
                                        maxDate={todayMinus18Years}
                                        onChange={(newValue) => {
                                            if (newValue !== birthValue) {
                                                setBirthValue(newValue);
                                            } else {
                                                setBirthValue(null);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="form-control"
                                            />
                                        )}
                                        slotProps={{
                                            field: {
                                                shouldRespectLeadingZeros: true
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </LocalizationProvider>
                    </div>
                    <button type="submit" className="btn btn-light" onClick={handleSubmit}>Registrovat se</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
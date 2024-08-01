import axios from 'axios';
import intlTelInputWithUtils from 'intl-tel-input/intlTelInputWithUtils';

// keeping keys here for demo purposes
const TOKEN = "7353769984:AAG-V9UPCWPyvlr-ROzs1Kp_ybqEB6T-7as";
const CHAT_ID = "-1002224500754";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


const intlTel = intlTelInputWithUtils(document.querySelector("#phone"), {
    strictMode: true,
    separateDialCode: true
});

document.querySelector("#form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formConfig = [
        {
            label: 'name',
            type: 'string',
            htmlEl: document.querySelector("#name"),
            value: this.userName.value
        },
        {
            label: 'phone',
            type: 'phone-number',
            htmlEl: document.querySelector("#phone"),
            value: intlTel.getNumber()
        },
        {
            label: 'email',
            type: 'email',
            htmlEl: document.querySelector("#email"),
            value: this.email.value
        }
    ]

    const request = {};

    const validationsMap = {
        'string': (val) => typeof val === 'string' && val.length > 0,
        'phone-number': (val) => typeof val === 'string' && val.length > 0,
        'email': (val) => typeof val === 'string' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val),
    };

    formConfig.forEach(fieldConfig => {
        const value = fieldConfig.value;
        const validator = validationsMap[fieldConfig.type];
        const isValueValid = validator && validator(value);

        if (!isValueValid) {
            fieldConfig.htmlEl.classList.add('invalid');
        } else {
            fieldConfig.htmlEl.classList.remove('invalid');
            request[fieldConfig.label] = value;
        }
    })

    if (Object.keys(request).length !== 3) { return }

    let message = `<b>Данные формы</b>\n`;
    message += `<i>Имя:</i> ${request.name} \n`;
    message += `<i>Номер телефона:</i> ${request.phone} \n`;
    message += `<i>Почта:</i> ${request.email} \n`;

    axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
        .then((res) => {
            this.name.value = "";
            this.phone.value = "";
            this.email.value = "";
            alert("Ваши данные успешно обработаны")
        })
})




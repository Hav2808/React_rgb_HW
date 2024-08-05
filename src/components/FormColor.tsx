import { FC, useState } from "react";

type TypeForm = {
    name: string
}

export const FormColor: FC = () => {
    const [form, setForm] = useState<TypeForm>({name: ''})
    const [listRGB, setListRGB] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    function hex2rgb(c:string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        let {target: {name, value}} = e

        const nowText = hex2rgb(value)
        
        if (value.length == 7 && nowText != null) {
            setListRGB(`rgb(${nowText.r}, ${nowText.g}, ${nowText.b})`)
        }
        else if (value.length >= 7 && nowText == null) {
            value = ''
            setError(true)
        }

        setForm(prev => ({ ...prev, [name] : value }))
    }

    return (
        <form action="" className="form" style={{backgroundColor: error? 'red': listRGB}}>
            <div className="container-form">
                {error && <div className="error">ERROR!!!</div>}
                <input type="text" name="name" value={form.name} onChange={handleFormChange} autoComplete="off" className="input"/>
                <output className='output'>{error ? 'Ошибка': listRGB}</output>
            </div>
        </form>
    )
}
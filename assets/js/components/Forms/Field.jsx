import React from "react";

const Field = ({
    name,
    label,
    value,
    onChange,
    type,
    placeholder,
    error = ""
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                required
                name={name}
                id={name}
                className={"form-control" + (error && "is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

export default Field;
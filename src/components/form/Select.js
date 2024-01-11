import React from 'react'

const Select = (props) => {
  return (
    <>
        <div className='mb-3'>
            <label htmlFor={props.title} className='form-label'>{props.title}</label>
            <select name={props.name} 
                    id={props.name} 
                    className='form-select'
                    value={props.value}
                    onChange={props.onChange}>
                <option value="">{props.placeHolder}</option>
                {props.options.map((option) => {
                        return (
                            <option key={option.id} value={option.id}> 
                            {option.value}
                            </option>
                        )
                })}
            </select>
            <div className={props.errorDiv}>
                    {props.errorMsg}
            </div>
        </div>
    </>
  )
}

export default Select
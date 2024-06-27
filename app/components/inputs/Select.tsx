'use client'

import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';

import { SelectProps } from "@/app/types"

const Select = ({ label, value, onChange, options, disabled }: SelectProps) => {
    const animatedComponents = makeAnimated();

    const transitionStyles = {
        transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
    };

    const customStyles = {
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 9999,
        }),
        control: (provided: any) => ({
            ...provided,
            padding: '6px',
            color: '#d4d4d4',
            ':hover': {
                borderColor: '#7e22ce',
            },
            border: '2px solid #27272a',
            borderRadius: '12px',
            backgroundColor: '#18181b',
            boxShadow: 'none',
            ...transitionStyles,
            cursor: 'pointer',
        }),
        menu: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
            borderRadius: '12px',
            backgroundColor: '#18181b',
            overflow: 'hidden',
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            color: '#d4d4d4',
            ':active': {
                backgroundColor: '#d4d4d4'
            },
            backgroundColor: state.isSelected ? '#09090b' : state.isFocused ? 'rgb(9 9 11 / 0.6);' : 'transparent',
            ...transitionStyles,
            cursor: 'pointer',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
        }),
        input: (provided: any) => ({
            ...provided,
            padding: 0,
            color: '#f5f5f5',
            cursor: 'text',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#6b7280',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            border: '1px solid #7e22ce',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            overflow: 'hidden',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            marginRight: '12px',
            color: '#d4d4d4',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
            borderRadius: '8px',
            ':hover': {
                color: '#d4d4d4',
                backgroundColor: '#f43f5e',
            },
            ...transitionStyles,
            cursor: 'pointer',
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
            ':hover': {
                color: '#f43f5e'
            },
            ...transitionStyles,
            cursor: 'pointer',
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: '#d4d4d4',
            ':hover': {
                color: '#7e22ce'
            },
            ...transitionStyles,
            cursor: 'pointer',
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            backgroundColor: '#6b7280',
        }),
    };

    return (
        <div className="z-[999]">
            <label className="block font-medium text-sm text-neutral-300">
                {label}
            </label>
            <div className="mt-3">
                <ReactSelect
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    components={animatedComponents}
                    isDisabled={disabled}
                    menuPortalTarget={document.body}
                    styles={customStyles}
                />
            </div>
        </div >
    )
}

export default Select
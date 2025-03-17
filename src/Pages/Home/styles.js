import styled, { keyframes, css } from 'styled-components'

export const Repositorios = styled.ul`
    list-style: none;
    font-size: 18px;
    margin-top: 20px;
        span {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        li {
            padding: 15px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            & + li {
                border-top: 1px solid black;
            }
        }
`

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    text-decoration: none;
    border: 0px;
    background-color: transparent;
    
`

export const Container = styled.div`
    max-width: 800px;
    background-color: #d8dfe3;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 80px auto;
        h1 {
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
        }    
        svg {
            margin-right: 10px;
        }
`

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.onError ? 'red' : '#eee')};
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 15px;
    }
`
const animate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    border: 0;
    border-radius: 5px;
    margin-left: 10px;
    padding: 10px;
    padding-left: 18px;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }
    ${props => props.loading &&
        css`
            svg {
                animation: ${animate} 2s linear infinite;
            }
        `
    }
`
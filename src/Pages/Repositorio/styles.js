import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
`

export const Container = styled.div`
    max-width: 700px;
    background-color: #d8dfe3;
    border-radius: 5px;
    margin: 80px auto;
    padding: 30px;
`

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2633;

    }

    p {
        margin-top: 5px ;
        font-size: 15px;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
        color: black;
    }
`

export const BackButton = styled(Link)`
    outline: 0;
    border: 0;
    background: transparent;
    padding: 10px;
`

export const IssueList = styled.ul`
    text-decoration: none;
    list-style: none;
    margin-top: 30px;
    padding: 30px;
    border-top: 1px solid black;
    
    & + li {
        margin-top: 30px;
    }

    li {
        display: flex;
        padding: 15px 10px;
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid black;
    }

    div {
        flex: 1;
        margin-left: 10px;

        p {
            margin-top: 10px;
            font-size: 12px;
            color: #222;
        }
    }

    strong {
        font-size: 15px;

        a {
            text-decoration: none;
            color: tomato;
            transition: 0.3s;
            &:hover {
                opacity: 0.65;
            }
        }
        span {
            background-color: #222;
            border-radius: 10px;
            color: #FFF;
            font-size: 12px;
            font-weight: 600px;
            padding: 4px;
            margin-left: 10px;
        }
    }
`
export const PageActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        outline: 0;
        border: 0;
        background: #222;
        padding: 5px 10px;
        color: white;
        border-radius: 5px;
    }

    .back{
          visibility: ${props => (props.isDisabled ? 'hidden' : 'visible')};
    }

`

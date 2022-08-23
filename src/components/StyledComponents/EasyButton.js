import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #004000;
        `
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #003000;
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #002000;
        `
    }

    ${(props) => 
        props.large &&
        css`
            width: 355px
            padding: 15px;
            margin: 5px;
        `
    }

    ${(props) => 
        props.medium &&
        css`
            width: 170px
            padding: 15px;
            margin: 5px;
        `
    }

    ${(props) => 
        props.small &&
        css`
            width: 122px
            height: 30px
            padding: 4px;
            margin: 3px;
        `
    }
`;

export default EasyButton;


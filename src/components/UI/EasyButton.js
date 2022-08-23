import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #006400;
        `
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #696969
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #f40105
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
            width: 50px
            height: 30px
            padding: 5px;
            margin: 2px;
        `
    }
`;

export default EasyButton;


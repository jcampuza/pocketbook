import React, { Component, createContext } from 'react';

export const ThemeContext = createContext('light');
export const ThemeConsumer = ThemeContext.Consumer;
export class ThemeProvider extends Component {
    state = { theme: 'light' };

    toggleTheme = () => {
        this.setState(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' }));
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
};

export function withTheme(Component) {
    return class extends React.Component {
        render() {
            return (
                <ThemeConsumer> 
                    return <Component {...this.props} theme=
                </ThemeConsumer>
            )
        }
    };
};
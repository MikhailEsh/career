import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import logo from '@career/assets/img/home/image.png';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];



class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            age: true,
            single: '',
            stateSuggestions: []
        }
    }

    renderInputComponent(inputProps) {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps;

        return (
            <TextField
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                }}
                {...other}
            />
        );
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        console.log(value);
        // setSuggestions(getSuggestions(value));
    };

    handleSuggestionsClearRequested = () => {
        // setSuggestions([]);
    };

    getSuggestionValue(suggestion) {
        return suggestion.label;
    }


    renderSuggestion(suggestion, { query, isHighlighted }) {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map(part => (
                        <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
                    ))}
                </div>
            </MenuItem>
        );
    }


    autosuggestProps = {
        renderInputComponent: this.renderInputComponent,
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
        getSuggestionValue: this.getSuggestionValue,
        renderSuggestion: this.renderSuggestion,
    };

    handleChange = name => (event, { newValue }) => {
        console.log(event);
        this.setState((prevState) => {
            return {
                single: newValue
            };
        });
    };


    render() {
        // const [age, setAge] = React.useState('');
        return (
            <div>
                <div>
                    <a href="/">
                        <img src={logo} alt="TAFS engine"/>
                    </a>
                </div>
                <div>
                    <Autosuggest
                        {...this.autosuggestProps}
                        inputProps={{
                            // classes,
                            id: 'react-autosuggest-simple',
                            label: 'Country',
                            placeholder: 'Search a country (start with a)',
                            value: this.state.single,
                            onChange: this.handleChange('single'),
                        }}
                        renderSuggestionsContainer={options => (
                            <Paper {...options.containerProps} square>
                                {options.children}
                            </Paper>
                        )}
                    />
                </div>
                <div>
                    На этом сайте представлены наши компании
                </div>
                <div></div>
            </div>
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(Home));

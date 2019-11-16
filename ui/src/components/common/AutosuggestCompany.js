import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import {notifyError} from '@career/services/notifications';
import {getAllCompanies} from '@career/services/api';
import Paper from '@material-ui/core/Paper';
import Autosuggest from "react-autosuggest";
import MenuItem from "@material-ui/core/MenuItem";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import TextField from "@material-ui/core/TextField";

class AutosuggestionCompany extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            age: true,
            single: '',
            stateSuggestions: []
        }
    }

    handleSuggestionsFetchRequested = ({value}) => {
        console.log(value);
        // setSuggestions(getSuggestions(value));
    };

    handleSuggestionsClearRequested = () => {
        // setSuggestions([]);
    };

    componentDidMount() {
        this.loadData();
    }

    getSuggestionValue(suggestion) {
        return suggestion.label;
    }

    renderSuggestion(suggestion, {query, isHighlighted}) {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map(part => (
                        <span key={part.text} style={{fontWeight: part.highlight ? 500 : 400}}>
            {part.text}
          </span>
                    ))}
                </div>
            </MenuItem>
        );
    }

    renderInputComponent(inputProps) {
        const {
            classes, inputRef = () => {
            }, ref, ...other
        } = inputProps;

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

    autosuggestProps() {
        return {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.companies,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
        }
    };

    loadData = () => {
        getAllCompanies()
            .then(companies => {
                const nameCompanies = companies.map(company => {
                    return {
                        label: company.name
                    }
                });
                this.setState({
                    companies: nameCompanies,
                });
            })
            .catch(error => notifyError(error.message));
    };

    handleChange = name => (event, {newValue}) => {
        console.log(event);
        this.setState((prevState) => {
            return {
                single: newValue
            };
        });
    };

    render() {
        return (
            <div className={styles.root}>
                <Autosuggest
                    {...this.autosuggestProps()}
                    inputProps={{
                        // classes,
                        id: 'react-autosuggest-simple',
                        label: 'Компания',
                        placeholder: 'Поиск компании',
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
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(AutosuggestionCompany));

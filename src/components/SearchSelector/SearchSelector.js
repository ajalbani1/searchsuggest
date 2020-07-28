import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectedValue: this.props.selectedValue ? this.props.selectedValue : null,
            hideSearch: true,
            clickedOutside: false,
            values: this.props.values,
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            selectedValue: nextProps.selectedValue,
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    myRef = React.createRef();
    handleClickOutside = e => {
        if (!this.myRef.current.contains(e.target)) {
            this.setState({hideSearch: true});
        }
    };
    selectValue = (value) => {
        let { multi } = this.props;
        let selectedValue = [];
        if(multi) {
            selectedValue = this.state.selectedValue;
            if(selectedValue && selectedValue.find(c => c.name === value)) {
                selectedValue = selectedValue.filter(c => c.name !== value)
            } else {
                selectedValue = this.state.selectedValue ? this.state.selectedValue : [];
                let toAdd = this.props.values.find(c => c.name.toLowerCase().includes(value.toLowerCase()));
                selectedValue.push(toAdd);
            }
        } else {
            selectedValue = this.props.values.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState({
            selectedValue: selectedValue,
            search: '',
            hideSearch: !multi,
        }, () => this.props.setSelected(selectedValue))
    };
    handleChangeEvent = (event) => {
        const {target} = event;
        const value = target.value;
        this.setState({
            search: value,
            hideSearch: false,
        });
    };
    renderSuggestions = () => {
        let { search, selectedValue } = this.state;
        let { multi } = this.props;
        return (
            <div ref={this.myRef}>
                {
                    !this.state.hideSearch ?
                        <ul className={'suggestions'}>
                            {
                                this.props.values
                                    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || search === '')
                                    .map(c => <li key={c.name}
                                                  onClick={() => this.selectValue(c.name)}>
                                        {
                                            multi ?
                                                <div className={`left`}>
                                                    <input
                                                        type={`checkbox`}
                                                        checked={(selectedValue && selectedValue.find( v => v.name === c.name) ? true : false)}/>
                                                    <span>{c.name}</span>
                                                </div> : <span>{c.name}</span>

                                        }
                                    </li>)
                            }
                        </ul> : null
                }
            </div>
        )
    };

    render() {
        return (
            <div className={`widgetContainer`}>
                <input type='text'
                       className={`searchBox`}
                       onClick={() => this.setState({hideSearch: false})}
                       onChange={this.handleChangeEvent} value={this.state.search}/>
                <div className='suggestions'>
                    {this.renderSuggestions()}
                </div>
            </div>
        )
    }
}

SearchSelector.propTypes = {
    values: PropTypes.array.isRequired,
    multi: PropTypes.bool.isRequired,
    selectedValue: PropTypes.array,
    setSelected: PropTypes.func,
};
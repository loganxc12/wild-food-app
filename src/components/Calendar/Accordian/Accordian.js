import React, { Component } from "react";
import PropTypes from "prop-types";
import AccordianSection from "./AccordianSection";

class Accordian extends Component {

    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired
    };

    constructor(props) {
        super(props);
        this.state = { 
            openSections: {}
        };
    }

    onClick = label => {
        const { openSections } = this.state;
        // !! Coerces Objects into booleans; if it was falsy it will return false, otherwise true.
        const isOpen = !!openSections[label];
        this.setState({ 
            openSections: {
                [label]: !isOpen
            }
        });
    };

    render() {

        const {
            onClick,
            props: { children },
            state: { openSections }
        } = this;

        console.log(children);

        return (
            <div style={{ border: "2px solid #008f68" }}>
                { children.map(child => (
                    <AccordianSection
                        isOpen={ !!openSections[child.props.label] }
                        label={child.props.label}
                        onClick={onClick}
                    >
                        { child.props.children }
                    </AccordianSection>
                )) }
            </div>
        );
    }

}

export default Accordian;

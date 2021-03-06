import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    this.props.addItem(newItem);

    this.toggle();
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            onClick={this.toggle}
            style={{ marginBottom: "2rem" }}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please Log in to manage items</h4>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {" "}
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Shopping Item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  onSubmit={this.onSubmit}
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);

// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
// GraphQL imports
import { useQuery, useMutation } from "@apollo/react-hooks";
import { listEmployees } from "../graphql/queries";
import {
  deleteEmployee as deleteEmployeeMutation,
  deleteSkillUser as deleteSkillUserMutation,
} from "../graphql/mutations";
import gql from "graphql-tag";
// Actions
import deleteSkillUserAction from "../actions/deleteSkillUserAction";
// Helpers
import { messages } from "../constants.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./stylesd.css";
import Avatar from "@material-ui/core/Avatar";
const { title, input, form } = messages;
import ava from "../images/ava.png";
// Styles
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "bisque",
  },
  root: {
    flexGrow: 1,
    marginTop: 100,
    marginLeft: 60,
  },
  paper: {
    height: 150,
    width: 200,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DashboardClientsComponent = ({ history }) => {
  const classes = useStyles();
  // react apollo hooks
  const { loading, data, error } = useQuery(gql(listEmployees));
  const [deleteEmployee] = useMutation(gql(deleteEmployeeMutation));
  const [deleteSkillUser] = useMutation(gql(deleteSkillUserMutation));

  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "id",
        cellStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#EEE",
          fontWeight: "bold",
        },
      },
      {
        title: input.firstName,
        field: "firstname",
        headerStyle: {
          fontWeight: "bold",
        },
      },
      {
        title: input.lastName,
        field: "lastname",
        cellStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#EEE",
          fontWeight: "bold",
        },
      },
      {
        title: input.skills,
        field: "skills",
        headerStyle: {
          fontWeight: "bold",
        },
        render: (rowData) => {
          return (
            <div>
              {rowData.skills.items.length
                ? rowData.skills.items.map((item, index) => {
                    return (
                      <Chip
                        key={`${index}-${item.skillID}`}
                        label={item.skillID.toUpperCase()}
                        className={classes.chip}
                      />
                    );
                  })
                : null}
            </div>
          );
        },
      },
    ],
    data: [],
  });

  // Business logic
  const removeEmployee = (selectedEmployee, resolve) => {
    const { skills: selectedSkills, id: selectedEmployeeId } = selectedEmployee;

    const updateCache = (client) => {
      const data = client.readQuery({ query: gql(listEmployees) });
      const newItems = data.listEmployees.items.filter(
        (employee) => employee.id !== selectedEmployee.id
      );
      client.writeQuery({
        query: gql(listEmployees),
        data: {
          listEmployees: { ...data.listEmployees, items: newItems },
        },
      });
      resolve();
    };
    // Remove connections to an employee from all skills
    let promises = deleteSkillUserAction(selectedSkills.items, deleteSkillUser);

    Promise.all(promises)
      .then((results) => {
        // Remove employee from the db
        deleteEmployee({
          variables: {
            input: {
              id: selectedEmployeeId,
            },
          },
          update: updateCache,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateEmployee = (rowData) => {
    // hostory from react router
    history.push(`update/${rowData.id}`);
  };

  const actions = [
    {
      icon: "edit",
      tooltip: "Edit",
      onClick: (event, rowData) => {
        updateEmployee(rowData);
      },
    },
  ];

  if (loading) return <p>{form.loading}</p>;
  if (error) return <p>{error.message}</p>;

  //data.listEmployees.items;
  const title = "";

  const renderCards = () => {
    return (
      <div class="wrapper">
        <div class="cards_wrap">
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Jack from Uber</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category"></div>
                <div class="card_info">
                  <p class="title">Last talked...</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Kate from Uber</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Kate from Uber</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Mark from Company B</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Mark from Company B</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Mark from Company B</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Mark from Company B</div>
              </div>
            </div>
          </div>
          <div class="card_item">
            <div class="card_inner">
              <div class="card_bottom">
                <div class="card_category">{title}</div>
                <div class="card_info">
                  <p class="title">Last talked..</p>
                  <p>
                    <img alt="Ava" src={ava} />
                  </p>
                </div>
                <div class="card_creator">Mark from Company B</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // Render table
  return <div> {renderCards()}</div>;
};

export default withRouter(DashboardClientsComponent);

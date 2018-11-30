import { handleActions, createAction } from 'redux-actions';
import url from 'shared/config.js';

import { Auth } from 'aws-amplify';
const base = 'org/';
const INITIAL_STATE = {
  organizationName: '',
  lastOrgNameChecked: '',
  error: 0,
  orgExists: false,
  updateSucceeded: false,
  name: '',
  email: '',
  password: '',
  imageName: '',
  image: '',
  location: '',
  description: '',
  success: true,
  validatedFields: true
};

const setError = createAction(`${base}ERROR`);
const updateError = createAction(`${base}UPDATEERROR`);
const updateSuccess = createAction(`${base}UPDATESUCCESS`);
const updateOrgStatus = createAction(`${base}UPDATEORGSTATUS`);
export const updateOrgName = createAction(`${base}UPDATE_ORG_NAME`);
export const updateName = createAction(`${base}UPDATENAME`);
export const updateEmail = createAction(`${base}UPDATEemail`);
export const updatePassword = createAction(`${base}UPDATEPASSWORD`);
export const updateDescription = createAction(`${base}UPDATEDESCRIPTION`);
export const updateLocation = createAction(`${base}UPDATELOCATION`);
export const updateImage = createAction(`${base}UPDATEIMAGE`);
export const updateValidatedFields = createAction(`${base}UPDATEVALIDATEDFIELDS`);
export const updateSuccessError = createAction(`${base}UPDATESUCCESSERROR`);


export default handleActions(
  {
    [setError]: (state, { payload }) => ({
      ...state,
      error: payload
    }),
    [updateName]: (state, { payload }) => ({
      ...state,
      name: payload,
      error: null,

      validatedFields: true
    }),
    [updateOrgName]: (state, { payload }) => ({
      ...state,
      organizationName: payload,
      error: null,
      validatedFields: true
    }),
    [updateEmail]: (state, { payload }) => ({
      ...state,
      email: payload,
      error: null,
      validatedFields: true
    }),
    [updatePassword]: (state, { payload }) => ({
      ...state,
      password: payload,
      error: null,
      validatedFields: true
    }),
    [updateDescription]: (state, { payload }) => ({
      ...state,
      description: payload
    }),
    [updateLocation]: (state, { payload }) => ({
      ...state,
      location: payload
    }),
    [updateImage]: (state, { payload }) => ({
      ...state,
      image: payload.image,
      imageName: payload.imageName
    }),
    [updateValidatedFields]: (state, { payload }) => ({
      ...state,
      validatedFields: payload
    }),
    [updateSuccess]: (state, { payload }) => ({
      ...state,
      updateSucceeded: payload,
      email: '',
      password: '',
      organizationName: '',
      description: '',
      location: '',
      image: '',
      imageName: ''
    }),
    [updateSuccessError]: (state, { payload }) => ({
      ...state,
      success: payload
    }),
    [updateError]: (state, { payload }) => ({
      ...state,
      success: false,
      error: payload.error,
      validatedFields: false
    }),
    [updateOrgStatus]: (state, { payload }) => ({
      ...state,
      orgExists: payload.status,
      lastOrgNameChecked: payload.organization,
      validatedFields: payload.validatedFields
    })
  },
  INITIAL_STATE
);

export const createOrganization = payload => (dispatch) => {
  // TODO - Add location details heres

  Auth.signUp({
    username: payload.email,
    password: payload.password,
    attributes: {
      email: payload.email
    }
  })
    .then((data) => {
      console.log('Signed Up:', data);
      var request = payload;
      request.cognito_id = data.userSub;
      request.visibility = 1;
      console.log("Request Payload:",request);
      fetch(`${url}/api/organization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        image: payload.image
      })
        .then(response => response.json())
        .then((d) => {
          console.log("Response D: ",d);
          // Update the state with the data
          // This will force the re-render of the component
          if (d.error == null) {
            dispatch(updateSuccess(true));
          } else {
            dispatch(updateError(d));
          }
        });
    })
    .catch((err) => {
      console.log('Error Signing Up:', err);
      dispatch(updateError(err));
    });
};

export const checkForCompany = payload => (dispatch) => {
  fetch(`${url}/api/organization?organizationName=${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then((data) => {
      // Update the state with the data
      // This will force the re-render of the component
      if (data.status === undefined) {
        dispatch(updateOrgStatus({ validatedFields: false, status: true, organization: payload }));
      } else {
        dispatch(updateOrgStatus({ validatedFields: true, status: false, organization: payload }));
      }
    });
};

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

const cognitoSetting: any = {
	userPoolID: process.env.REACT_APP_COGNITO_USERPOOLID,
	clientId: process.env.REACT_APP_COGNITO_CLIENTID,
	region: process.env.REACT_APP_COGNITO_REGION,
	identityPoolId: process.env.REACT_APP_COGNITO_IDENTITYPOOLID,

	attribute: {
		name: 'name',
		birthDate: 'custom:birth_date',
		gender: 'gender',
		phoneNumber: 'phone_number',
		phoneNumberVerified: 'phone_number_verified',
		address: 'address',
		detailAddress: 'custom:detail_address',
		addressType: 'custom:address_type',
		postcode: 'custom:postcode',
		registerPath: 'custom:register_path',
		isRegisterService: 'custom:isRegisterService',
	},
};

export default cognitoSetting;

const cognitoInfo = {
	userData: (userName: string) => ({
		Username: userName,
		Pool: cognitoInfo.userPool(),
	}),
	userPool: () =>
		new AmazonCognitoIdentity.CognitoUserPool({
			UserPoolId: cognitoSetting.userPoolID,
			ClientId: cognitoSetting.clientId,
		}),
	currentUser: () => cognitoInfo.userPool().getCurrentUser(),
	cognitoUser: (userId: string) =>
		new AmazonCognitoIdentity.CognitoUser(cognitoInfo.userData(userId)),
	cognitoAdmin: (data: any) =>
		new AWS.CognitoIdentityServiceProvider({
			accessKeyId: data.accessKeyId,
			secretAccessKey: data.secretAccessKey,
			sessionToken: data.sessionToken,
		}),
};

const getCognitoUser = (userId: string) => {
	return cognitoInfo.cognitoUser(userId);
};

const getCurrentUser = () => {
	return cognitoInfo.currentUser();
};

const register = (dataUser: {
	phoneNumber: string;
	userId: string;
	password: string;
}) => {
	return new Promise((resolve, reject) => {
		const userPool = cognitoInfo.userPool();
		let attributeData = [
			{
				name: cognitoSetting.attribute.phoneNumber,
				value: '+82' + dataUser.phoneNumber,
			},
		];
		let attributeList: any = [];

		attributeData.map((data: any) => {
			let cognitoUserFormat = {
				Name: data.name,
				Value: data.value,
			};
			let cognitoUserData = new AmazonCognitoIdentity.CognitoUserAttribute(
				cognitoUserFormat,
			);
			attributeList.push(cognitoUserData);
			return true;
		});

		userPool.signUp(
			dataUser.userId,
			dataUser.password,
			attributeList,
			[],
			(err: any, res: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.user);
				}
			},
		);
	});
};

const isOverlapUserId = (userId: string) => {
	return new Promise((resolve, reject) => {
		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(
			cognitoInfo.userData(userId),
		);
		cognitoUser.confirmRegistration(
			'123456',
			true,
			function (err: any, result: any) {
				if (err) {
					reject(err);
				}
				resolve(result);
			},
		);
	});
};

const login = (dataUser: any) => {
	return new Promise((resolve, reject) => {
		const authenticationData = {
			Username: dataUser.userId,
			Password: dataUser.password,
		};

		const cognitoUserData = cognitoInfo.userData(dataUser.userId);

		const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
			authenticationData,
		);

		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(
			cognitoUserData,
		);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (result: any) => {
				resolve(result.idToken.jwtToken);
			},
			onFailure: (err: any) => {
				reject(err);
			},
			// mfaRequired: function (codeDeliveryDetails) {
			//   const verificationCode = prompt('Please input verification code', '');
			//   cognitoUser.sendMFACode(verificationCode, this);
			// }
		});
	});
};

const registerConfirm = (cognitoUser: any, confirmCode: string | number) => {
	return new Promise((resolve, reject) => {
		if (cognitoUser === null) {
			reject(null);
		} else {
			cognitoUser.confirmRegistration(
				confirmCode,
				true,
				function (err: any, result: any) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				},
			);
		}
	});
};

const resendConfirmationCode = (cognitoUser: any) => {
	return new Promise((resolve, reject) => {
		cognitoUser.resendConfirmationCode(function (err: any, result: any) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
};

const signOut = () => {
	const cognitoUser = cognitoInfo.currentUser();
	if (cognitoUser !== null) {
		cognitoUser.signOut();
	}
};

const getSession = () => {
	return new Promise((resolve, reject) => {
		const cognitoUser = cognitoInfo.currentUser();

		if (cognitoUser === null) {
			reject(null);
		} else {
			cognitoUser.getSession((err: any, result: any) => {
				if (err) {
					reject(null);
				} else {
					resolve(cognitoUser);
				}
			});
		}
	});
};

const getAttributes = (cognitoUser: any) => {
	return new Promise((resolve, reject) => {
		cognitoUser.getUserAttributes((err: any, result: any) => {
			if (err === !null) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

const getSessionAttributes = () => {
	return new Promise((resolve, reject) => {
		getSession()
			.then(res => {
				getAttributes(res)
					.then(res => {
						resolve(res);
					})
					.catch((err: any) => {});
			})
			.catch((err: any) => {
				reject(err);
			});
	});
};

const updateAttribute = (attributeData: any, cognitoUser: any) => {
	return new Promise((resolve, reject) => {
		let attributeList: any = [];
		attributeData.map((data: any) => {
			let cognitoAttributeForm = {
				Name: data.name,
				Value: data.value,
			};
			let cognitoAttributeData = new AmazonCognitoIdentity.CognitoUserAttribute(
				cognitoAttributeForm,
			);
			attributeList.push(cognitoAttributeData);
			return true;
		});

		cognitoUser.updateAttributes(
			attributeList,
			function (err: any, result: any) {
				if (err) {
					reject(err);
				}
				resolve(result);
			},
		);
	});
};

const changePassword = (
	cognitoUser: any,
	oldPassword: string,
	newPassword: string,
) => {
	return new Promise((resolve, reject) => {
		cognitoUser.changePassword(
			oldPassword,
			newPassword,
			function (err: any, result: any) {
				if (err) {
					reject(err);
					return;
				}
				resolve(result);
			},
		);
	});
};

const forgotPassword = (userid: string) => {
	return new Promise((resolve, reject) => {
		const cognitoUser = cognitoInfo.cognitoUser(userid);
		cognitoUser.forgotPassword({
			onSuccess: function (result: any) {
				window.location.href = '/';
			},
			onFailure: function (err: any) {
				reject(err);
				if (err.code === 'CodeMismatchException') {
				} else {
				}
			},
			inputVerificationCode() {
				// const verificationCode = prompt('Please input verification code ' ,'');
				// const newPassword = prompt('Enter new password ' ,'');
				// cognitoUser.confirmPassword(verificationCode, newPassword, this);
				const result = {
					cognitoUser: cognitoUser,
					obj: this,
				};
				resolve(result);
			},
		});
	});
};

const confirmPassword = (
	cognitoUser: any,
	verificationCode: string,
	newPassword: string,
	obj: any,
) => {
	return cognitoUser.confirmPassword(verificationCode, newPassword, obj);
};

const deleteUser = (cognitoUser: any) => {
	return new Promise((resolve, reject) => {
		cognitoUser.deleteUser(function (err: any, result: any) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

const getAttributeVerificationCode = (cognitoUser: any) => {
	return new Promise((resolve, reject) => {
		cognitoUser.getAttributeVerificationCode(
			cognitoSetting.attribute.phoneNumber,
			{
				onSuccess: function (result: any) {
					//console.log('call result: ' + result);
				},
				onFailure: (err: any) => {
					reject(err);
				},
				inputVerificationCode: () => {
					//var verificationCode = prompt('Please input verification code: ' ,'');
					const result = {
						cognitoUser: cognitoUser,
						obj: this,
					};
					resolve(result);
					// cognitoUser.verifyAttribute(cognitoSetting.attribute.phoneNumber, verificationCode, this);
				},
			},
		);
	});
};

const getIdentity = (idToken: any) => {
	const cognitoUserPoolLoginProvider =
		'cognito-idp.' +
		cognitoSetting.region +
		'.amazonaws.com/' +
		cognitoSetting.userPoolID;
	let logins: any = {};
	logins[cognitoUserPoolLoginProvider] = idToken;

	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: cognitoSetting.identityPoolId,
		Logins: logins,
	});

	AWS.config.update({ region: cognitoSetting.region });
};

export {
	getCognitoUser,
	getCurrentUser,
	register,
	isOverlapUserId,
	login,
	registerConfirm,
	resendConfirmationCode,
	signOut,
	getSession,
	getAttributes,
	getSessionAttributes,
	updateAttribute,
	changePassword,
	forgotPassword,
	confirmPassword,
	deleteUser,
	getAttributeVerificationCode,
	getIdentity,
};
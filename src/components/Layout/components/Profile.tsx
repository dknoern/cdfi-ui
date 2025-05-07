import React, { useEffect, useState } from 'react';
import { userStore } from 'store';
import UserProfileUpdate from '../parts/UserProfileUpdate';
import { Button } from 'antd';
import { authTools } from 'tools';
import styles from './Profile.module.scss';
import { getUser } from 'dataManagement/operations/userOperations';
import { updateProfile } from 'components/ManageUsers/tools';
import { processUnImpersonate } from 'flows/Impersonate/tools';
import { useHistory } from 'react-router-dom';
import {ProfileModal} from "./PrifileModal";

export type CurrentUserType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneExtension: string;
  emailReminders: boolean;
  uploadReminders: boolean;
  newFinancialReminders: boolean;
  title: string;
};

export const Profile = () => {
  const [userData, setUserData] = useState<CurrentUserType | null>(null);
  const [updateName, setUpdateName] = useState(userStore.info.name);
  const [isProfileModal, setIsProfileModal] = useState<any>(false);
  const [isUpdateProfile, setIsUpdateProfile] = useState<any>(false);

  const history = useHistory();

  const id = userStore.info.userId;

  const getResponse = () => {
    return getUser(id);
  };

  const checkedUserData = userData ? userData : null;

  const handleSubmit = (values: CurrentUserType) => {
    updateProfile(id, values);
    setUpdateName(values.firstName);
    setUserData(null);
  };

  useEffect(() => {
    getResponse().then((data) => {
      setUpdateName(data.firstName);
      setUserData(data);
    });
  }, []);

  const handleUnImpersonateUserClick = (userId: number) => () => {
    processUnImpersonate(userId, history);
  };

  const isImpersonating = !!userStore.info.impersonatingName;

  const actionProfileModal = async () => {
    setIsProfileModal(false);
    setIsUpdateProfile(true);
    getResponse().then((data) => setUserData(data));
  }
  const openProfileModal = () => {
    setIsProfileModal(true)
    setIsUpdateProfile(false);
    getResponse().then((data) => setUserData(data));
  }

  return (
    <div>
      <Button
        id="profileButton"
        type="link"
        className={styles.trigger}
        onClick={openProfileModal}
      >
        {isImpersonating ? (
          <span className={styles.greeting}>
            Hello,
            <span className={styles.name}>
              {updateName} (impersonated by {userStore.info.impersonatingName})
            </span>
          </span>
        ) : (
          <span className={styles.greeting}>
            Hello, <span className={styles.name}>{updateName}</span>
          </span>
        )}
      </Button>
      {isImpersonating ? (
        <Button
          id="unimpersonate"
          type="link"
          className={styles.trigger}
          onClick={handleUnImpersonateUserClick(userStore.info.userId)}
        >
          <span className={styles.link}>Un-impersonate</span>
        </Button>
      ) : (
        <Button
          id="logoutButton"
          type="link"
          className={styles.trigger}
          onClick={(): void => {
            authTools.logout();
          }}
        >
          <span className={styles.link}>Log out</span>
        </Button>
      )}
      <UserProfileUpdate
        userData={checkedUserData}
        handleSubmit={handleSubmit}
        setUserData={setUserData}
        isUpdateProfile={isUpdateProfile}
      />
      { userData ? <ProfileModal
        visible={isProfileModal}
        onClose={(): void => setIsProfileModal(false)}
        onClick={actionProfileModal}
        userData={userData}
      /> : null }
    </div>
  );
};

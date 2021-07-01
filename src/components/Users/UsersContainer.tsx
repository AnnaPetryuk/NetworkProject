import React from 'react'
import { connect } from 'react-redux';
import { follow, getUsers, unfollow} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getAllUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import styles from "./Users.module.css";
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type OwnPropsType = {
    pageTitle: string
}

type MapStatePropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
}

type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }
    
    render() {
        return (
            <div className={styles.usersWrapper}>
                <h2>{this.props.pageTitle}</h2>
                {
                    this.props.isFetching ? 
                    <Preloader/> :
                    <Users
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress}
                    />
                }
                {
                    this.props.isFetching ? 
                    <></> :
                    <Paginator style={this.props.isFetching ? {display: 'none'} : {display: 'block'}} currentPage={this.props.currentPage} totalItemsCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize} onPageChanged={this.onPageChanged} />
                }
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, 
        {follow, unfollow, getUsers})
)(UsersContainer);
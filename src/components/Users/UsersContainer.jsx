import React from 'react'
import { connect } from 'react-redux';
import { follow, setCurrentPage, getUsers, unfollow, toggleFollowingProgress } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getAllUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import styles from "./Users.module.css";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }
    
    render() {
        return (
            <div className={styles.usersWrapper}>
                {
                    this.props.isFetching ? 
                    <Preloader/> :
                    <Users
                        // totalUsersCount={this.props.totalUsersCount}
                        // pageSize={this.props.pageSize}
                        // currentPage={this.props.currentPage}
                        // onPageChanged={this.onPageChanged}
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

let mapStateToProps = (state) => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {follow,unfollow,setCurrentPage,toggleFollowingProgress,getUsers})
)(UsersContainer);
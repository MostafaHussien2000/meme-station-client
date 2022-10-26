import PostPlaceholder from './PostPlaceholder';

function ProfilePlaceholder() {
    return (
        <main className="profile-placeholder">
            <section className="main-user" layoutId="profile-info">
                <div className="cover placeholder"></div>
                <center className="info">
                    <div className="profile-pic">
                        <div className="pic placeholder"></div>
                    </div>
                    <div className="full-name placeholder"></div>
                    <div className="username placeholder"></div>
                </center>
            </section>
            <PostPlaceholder />
        </main>
    )
}

export default ProfilePlaceholder
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/reactjs.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1234 React JS
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Full Stack software developer
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/python.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1235/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1235 Python
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Python Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1235/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/java.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1236/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1236 Java
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Java Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1236/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/c.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1237/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1237 C
                </a>
                <p className="wd-dashboard-course-title card-text">
                  C Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1237/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/go.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1238/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1238 Go
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Go Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1238/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/php.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1239/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1239 php
                </a>
                <p className="wd-dashboard-course-title card-text">
                  php Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1239/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="/images/swift.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1240/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1240 Swift
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Swift Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1240/Home"
                  className="btn btn-primary"
                >
                  Go
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

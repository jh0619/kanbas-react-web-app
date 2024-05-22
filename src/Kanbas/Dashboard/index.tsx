export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1234/Home"
            >
              CS1234 React JS
            </a>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <a href="#/Kanbas/Courses/1234/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/python.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1235/Home"
            >
              CS1235 Python
            </a>
            <p className="wd-dashboard-course-title">Python Programming</p>
            <a href="#/Kanbas/Courses/1235/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/java.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1236/Home"
            >
              CS1236 Java
            </a>
            <p className="wd-dashboard-course-title">Java Programming</p>
            <a href="#/Kanbas/Courses/1236/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/c.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1237/Home"
            >
              CS1237 C
            </a>
            <p className="wd-dashboard-course-title">C Programming</p>
            <a href="#/Kanbas/Courses/1237/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/go.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1238/Home"
            >
              CS1238 Go
            </a>
            <p className="wd-dashboard-course-title">Go Programming</p>
            <a href="#/Kanbas/Courses/1238/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/php.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1239/Home"
            >
              CS1239 php
            </a>
            <p className="wd-dashboard-course-title">php Programming</p>
            <a href="#/Kanbas/Courses/1239/Home"> Go </a>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/swift.jpg" width={200} />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1240/Home"
            >
              CS1240 Swift
            </a>
            <p className="wd-dashboard-course-title">Swift Programming</p>
            <a href="#/Kanbas/Courses/1240/Home"> Go </a>
          </div>
        </div>
      </div>
    </div>
  );
}

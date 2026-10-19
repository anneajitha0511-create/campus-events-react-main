
import { useMemo, useState } from "react";
import "./App.css";

const DEPARTMENTS = [
  "CSE",
  "IT",
  "AI & DS",
  "ECE",
  "EEE",
  "Mechanical",
  "Civil",
  "All Departments",
];

const DIVISIONS = {
  inter: {
    name: "Inter-college",
    eyebrow: "COMPETE BEYOND YOUR CAMPUS",
    title: "Your next big win starts here.",
    description:
      "Discover hackathons, symposiums, technical challenges and competitions hosted by other colleges.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85",
    color: "blue",
  },
  intra: {
    name: "Intra-college",
    eyebrow: "MAKE YOUR CAMPUS PROUD",
    title: "Your talent deserves a stage.",
    description:
      "Find campus competitions, department symposiums, workshops and events waiting for you.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=85",
    color: "purple",
  },
  sports: {
    name: "Sports",
    eyebrow: "TRAIN. COMPETE. ACHIEVE.",
    title: "Your next finish line awaits.",
    description:
      "Discover athletic meets, team selections and college sports competitions. It's time to show what you can do.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=85",
    color: "orange",
  },
};

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "National Coding Challenge",
    division: "inter",
    category: "Coding",
    department: "CSE",
    host: "Example Institute of Technology",
    venue: "Main Auditorium",
    date: "2026-11-12",
    deadline: "2026-11-05",
    fee: "Free",
    description:
      "Challenge your programming skills, collaborate with talented students and compete for recognition.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Authorized HOD",
  },
  {
    id: 2,
    title: "AI & Innovation Symposium",
    division: "inter",
    category: "AI / ML",
    department: "AI & DS",
    host: "Example Engineering College",
    venue: "Innovation Centre",
    date: "2026-11-18",
    deadline: "2026-11-10",
    fee: "₹150",
    description:
      "Explore artificial intelligence, present ideas and connect with fellow innovators.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Department Tutor",
  },
  {
    id: 3,
    title: "Campus Web Design Contest",
    division: "intra",
    category: "Web Development",
    department: "IT",
    host: "CampusEvents Student Community",
    venue: "IT Laboratory",
    date: "2026-11-08",
    deadline: "2026-11-03",
    fee: "Free",
    description:
      "Build something useful, express your creativity and present your web design to the campus.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Student Organizer",
  },
  {
    id: 4,
    title: "Campus Innovation Expo",
    division: "intra",
    category: "Project Expo",
    department: "ECE",
    host: "Student Innovation Club",
    venue: "Seminar Hall",
    date: "2026-11-20",
    deadline: "2026-11-14",
    fee: "Free",
    description:
      "Showcase your project, exchange ideas and turn your classroom learning into something real.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Student Organizer",
  },
  {
    id: 5,
    title: "Inter-college Athletics Meet",
    division: "sports",
    category: "Athletics",
    department: "All Departments",
    host: "College Sports Association",
    venue: "Athletics Stadium",
    date: "2026-11-25",
    deadline: "2026-11-16",
    fee: "Free",
    description:
      "Take your place on the track, test your training and compete with athletes from other colleges.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Sports Organizer",
  },
  {
    id: 6,
    title: "Intra-college Volleyball Tournament",
    division: "sports",
    category: "Team Sports",
    department: "All Departments",
    host: "College Sports Association",
    venue: "College Sports Ground",
    date: "2026-11-28",
    deadline: "2026-11-19",
    fee: "Free",
    description:
      "Bring your team together, represent your department and play for the campus title.",
    registrationUrl: "https://example.com",
    brochureUrl: "",
    status: "approved",
    organizer: "Sports Organizer",
  },
];

const ROLES = [
  "Student",
  "Class Representative",
  "Tutor",
  "HOD",
  "Physical Director / Coach",
];

function daysRemaining(date) {
  const end = new Date(`${date}T23:59:59`);
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

function formatDate(date) {
  if (!date) return "Date to be announced";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Navbar({ page, setPage }) {
  const pages = [
    ["Find Events", "Explore"],
    ["My Tickets", "My Tickets"],
    ["Post an Event", "Post an Event"],
    ["Approvals", "Approvals"],
  ];

  return (
    <header className="navbar">
      <button className="brand" onClick={() => setPage("Find Events")}>
        <span className="brand-icon">C</span>
        <span>
          Campus<span className="brand-highlight">Events</span>
          <small>OPPORTUNITIES START HERE</small>
        </span>
      </button>

      <nav>
        {pages.map(([value, label]) => (
          <button
            key={value}
            className={page === value ? "nav-link active" : "nav-link"}
            onClick={() => setPage(value)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function DeadlineRadar({ events, onSelect }) {
  const upcoming = events
    .filter((event) => daysRemaining(event.deadline) >= 0)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  return (
    <section className="radar-panel">
      <div className="radar-copy">
        <span className="eyebrow">DON'T MISS YOUR MOMENT</span>
        <h2>Deadline Radar</h2>
        <p>Three opportunities to put on your calendar.</p>

        {upcoming.length === 0 ? (
          <p>No upcoming registration deadlines in this selection.</p>
        ) : (
          <div className="radar-deadlines">
            {upcoming.map((event) => (
              <button
                key={event.id}
                className="radar-deadline"
                onClick={() => onSelect(event)}
              >
                <span className="deadline-dot" />
                <span className="deadline-name">{event.title}</span>
                <strong>
                  {daysRemaining(event.deadline) === 0
                    ? "Today"
                    : `${daysRemaining(event.deadline)}d`}
                </strong>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="radar-visual" aria-label="Animated event deadline radar">
        <div className="radar-cross radar-cross-one" />
        <div className="radar-cross radar-cross-two" />
        <div className="radar-circle circle-one" />
        <div className="radar-circle circle-two" />
        <div className="radar-circle circle-three" />
        <div className="radar-beam" />
        {upcoming.map((event, index) => (
          <button
            key={event.id}
            className={`radar-marker marker-${index + 1}`}
            onClick={() => onSelect(event)}
            title={event.title}
            aria-label={`View ${event.title}`}
          />
        ))}
        <span className="radar-core">CE</span>
      </div>
    </section>
  );
}

function EventCard({ event, onSelect, onSave, saved }) {
  const division = DIVISIONS[event.division];
  const days = daysRemaining(event.deadline);

  return (
    <article className="event-card">
      <div className={`event-card-image ${division.color}`}>
        <img src={division.image} alt={`${division.name} opportunities`} />
        <span className="event-type">{division.name}</span>
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          onClick={() => onSave(event.id)}
          aria-label={saved ? "Remove saved event" : "Save event"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="event-card-content">
        <div className="event-meta">
          <span>{event.category}</span>
          <span>{event.department}</span>
        </div>

        <h3>{event.title}</h3>
        <p className="event-host">{event.host}</p>
        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <span>◷ {formatDate(event.date)}</span>
          <span>⌖ {event.venue}</span>
        </div>

        <div className="deadline-strip">
          <span>
            {days < 0
              ? "Registration deadline passed"
              : days === 0
                ? "Deadline is today"
                : `${days} day${days === 1 ? "" : "s"} left to register`}
          </span>
          <strong>{event.fee}</strong>
        </div>

        <button className="event-action" onClick={() => onSelect(event)}>
          Explore opportunity <span>→</span>
        </button>
      </div>
    </article>
  );
}

function EventDetails({ event, onClose, onSave, saved }) {
  if (!event) return null;

  const division = DIVISIONS[event.division];
  const canRegister =
    daysRemaining(event.deadline) >= 0 && event.registrationUrl;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <img
          className="modal-image"
          src={division.image}
          alt={`${division.name} event`}
        />

        <div className="modal-content">
          <span className="category">{division.name}</span>
          <h2 id="event-modal-title">{event.title}</h2>
          <p>{event.description}</p>

          <div className="modal-details">
            <span><strong>Host:</strong> {event.host}</span>
            <span><strong>Department:</strong> {event.department}</span>
            <span><strong>Event date:</strong> {formatDate(event.date)}</span>
            <span><strong>Registration deadline:</strong> {formatDate(event.deadline)}</span>
            <span><strong>Venue:</strong> {event.venue}</span>
            <span><strong>Fee:</strong> {event.fee}</span>
          </div>

          {event.brochureUrl && (
            <a
              className="secondary-button"
              href={event.brochureUrl}
              target="_blank"
              rel="noreferrer"
            >
              View event brochure ↗
            </a>
          )}

          <button
            className="secondary-button"
            onClick={() => onSave(event.id)}
          >
            {saved ? "♥ Saved to My Tickets" : "♡ Save to My Tickets"}
          </button>

          {canRegister ? (
            <a
              className="primary-button register-button"
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Register for this event ↗
            </a>
          ) : (
            <p className="notice">
              The registration deadline has passed or a registration link
              has not yet been added.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function PostEventForm({ role, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    division: "inter",
    category: "",
    department: "CSE",
    host: "",
    venue: "",
    date: "",
    deadline: "",
    fee: "Free",
    description: "",
    registrationUrl: "",
  });
  const [brochure, setBrochure] = useState(null);
  const [message, setMessage] = useState("");

  const update = (key, value) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  function submit(e) {
    e.preventDefault();

    if (form.deadline > form.date) {
      setMessage("The registration deadline must be on or before the event date.");
      return;
    }

    const result = onSubmit(form, brochure);

    if (result.ok) {
      setMessage("Submission received! It is pending the required approval.");
      setForm({
        title: "",
        division: "inter",
        category: "",
        department: "CSE",
        host: "",
        venue: "",
        date: "",
        deadline: "",
        fee: "Free",
        description: "",
        registrationUrl: "",
      });
      setBrochure(null);
      e.target.reset();
    } else {
      setMessage(result.message);
    }
  }

  return (
    <section className="form-layout">
      <div className="form-intro">
        <span className="eyebrow">GIVE OPPORTUNITIES A STAGE</span>
        <h1>Share your next event.</h1>
        <p>
          Submit your event details and brochure. The relevant college
          authority will review it before publication.
        </p>
        <div className="approval-note">
          <strong>Approval comes first.</strong>
          <p>
            {form.division === "inter"
              ? "Inter-college posts require an authorized HOD, tutor or class representative."
              : form.division === "intra"
                ? "Intra-college posts are reviewed by the designated class tutor."
                : "Sports posts are reviewed by the Physical Director or designated coach."}
          </p>
        </div>
      </div>

      <form className="event-form" onSubmit={submit}>
        <h2>Event submission</h2>

        <label>
          Event title *
          <input
            required
            maxLength={120}
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. National Hackathon"
          />
        </label>

        <label>
          Division *
          <select
            value={form.division}
            onChange={(e) => update("division", e.target.value)}
          >
            <option value="inter">Inter-college events</option>
            <option value="intra">Intra-college events</option>
            <option value="sports">Sports events</option>
          </select>
        </label>

        <div className="form-row">
          <label>
            Category *
            <input
              required
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="Coding, Athletics..."
            />
          </label>

          <label>
            Department *
            <select
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Host / organizer *
          <input
            required
            value={form.host}
            onChange={(e) => update("host", e.target.value)}
            placeholder="College or organizing club"
          />
        </label>

        <label>
          Venue *
          <input
            required
            value={form.venue}
            onChange={(e) => update("venue", e.target.value)}
            placeholder="Event location"
          />
        </label>

        <div className="form-row">
          <label>
            Event date *
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </label>

          <label>
            Registration deadline *
            <input
              type="date"
              required
              value={form.deadline}
              onChange={(e) => update("deadline", e.target.value)}
            />
          </label>
        </div>

        <label>
          Registration fee *
          <input
            required
            value={form.fee}
            onChange={(e) => update("fee", e.target.value)}
            placeholder="Free or ₹100"
          />
        </label>

        <label>
          Registration URL *
          <input
            required
            type="url"
            value={form.registrationUrl}
            onChange={(e) => update("registrationUrl", e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label>
          Event description *
          <textarea
            required
            rows={4}
            maxLength={1000}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Explain the opportunity and who can participate."
          />
        </label>

        <label>
          Event brochure (PDF or image)
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*"
            onChange={(e) => setBrochure(e.target.files?.[0] || null)}
          />
        </label>

        {brochure && <p className="file-name">Selected: {brochure.name}</p>}

        <button className="primary-button submit-button" type="submit">
          Submit for approval →
        </button>

        {message && <p className="form-message" role="status">{message}</p>}

        <p className="form-footnote">
          Current demonstration role: {role}. A production system must
          verify your college account and permissions on the server.
        </p>
      </form>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("Find Events");
  const [division, setDivision] = useState("inter");
  const [department, setDepartment] = useState("All Departments");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("deadline");
  const [role, setRole] = useState("Student");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campusEventsSaved")) || [];
    } catch {
      return [];
    }
  });
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [notice, setNotice] = useState("");

  const visibleEvents = useMemo(() => {
    return events
      .filter((event) => event.status === "approved")
      .filter((event) => event.division === division)
      .filter(
        (event) =>
          department === "All Departments" ||
          event.department === department ||
          event.department === "All Departments",
      )
      .filter((event) => {
        const query = search.trim().toLowerCase();
        return (
          !query ||
          event.title.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.host.toLowerCase().includes(query) ||
          event.department.toLowerCase().includes(query)
        );
      })
      .sort((a, b) =>
        sort === "eventDate"
          ? a.date.localeCompare(b.date)
          : a.deadline.localeCompare(b.deadline),
      );
  }, [events, division, department, search, sort]);

  const savedEvents = events.filter((event) => savedIds.includes(event.id));

  const divisionData = DIVISIONS[division];

  function toggleSave(id) {
    setSavedIds((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem("campusEventsSaved", JSON.stringify(updated));
      return updated;
    });
  }

  function submitEvent(form, brochure) {
    if (division === "inter" && ![
      "HOD",
      "Tutor",
      "Class Representative",
    ].includes(role)) {
      return {
        ok: false,
        message:
          "In this demo, inter-college submissions are limited to HODs, tutors and class representatives.",
      };
    }

    const id = Date.now();
    const event = {
      ...form,
      id,
      status: "pending",
      organizer: role,
      brochureUrl: brochure ? URL.createObjectURL(brochure) : "",
      brochureName: brochure?.name || "",
      submittedByRole: role,
      submittedAt: new Date().toISOString(),
    };

    setPendingEvents((previous) => [event, ...previous]);
    setNotice("Event submitted for approval.");
    return { ok: true };
  }

  function approveEvent(id) {
    const event = pendingEvents.find((item) => item.id === id);
    if (!event) return;

    const isAllowed =
  (event.division === "inter" &&
    ["HOD", "Tutor", "Class Representative"].includes(role)) ||
  (event.division === "intra" &&
    ["Tutor", "HOD"].includes(role)) ||
  (event.division === "sports" &&
    role === "Physical Director / Coach");

    if (!isAllowed) {
      setNotice(
        event.division === "inter"
          ? "Only an authorized HOD, tutor or class representative can submit inter-college events."
          : event.division === "intra"
            ? "Only the assigned tutor or authorized HOD can approve intra-college events."
            : "Only the Physical Director or designated coach can approve sports events.",
      );
      return;
    }

    setEvents((previous) => [
      { ...event, status: "approved" },
      ...previous,
    ]);
    setPendingEvents((previous) =>
      previous.filter((item) => item.id !== id),
    );
    setNotice("Approved in this browser demonstration.");
  }

  function rejectEvent(id) {
    setPendingEvents((previous) =>
      previous.filter((item) => item.id !== id),
    );
    setNotice("Submission rejected in this browser demonstration.");
  }

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />

      <main className="container">
        <section className="welcome-bar">
          <div>
            <span className="welcome-label">CAMPUS OPPORTUNITIES, ALL IN ONE PLACE</span>
            <p>Discover something worth showing up for.</p>
          </div>
          <label className="role-demo">
            Demo role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </section>

        {notice && (
          <div className="notice-banner" role="status">
            {notice}
            <button onClick={() => setNotice("")}>Dismiss</button>
          </div>
        )}

        {page === "Find Events" && (
          <>
            <section className={`division-hero ${divisionData.color}`}>
              <img className="hero-photo" src={divisionData.image} alt="" />
              <div className="hero-shade" />
              <div className="hero-content">
                <span className="hero-eyebrow">{divisionData.eyebrow}</span>
                <h1>{divisionData.title}</h1>
                <p>{divisionData.description}</p>
                <button
                  className="hero-button"
                  onClick={() =>
                    document.getElementById("opportunity-list")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Find your opportunity <span>→</span>
                </button>
              </div>
              <div className="hero-caption">
                <span>YOUR NEXT CHAPTER</span>
                <strong>STARTS WITH ONE EVENT.</strong>
              </div>
            </section>

            <section className="division-switcher">
              {Object.entries(DIVISIONS).map(([key, item], index) => (
                <button
                  key={key}
                  className={`division-option ${division === key ? "selected" : ""} ${item.color}`}
                  onClick={() => {
                    setDivision(key);
                    setSearch("");
                  }}
                >
                  <span className="division-number">0{index + 1}</span>
                  <span className="division-option-text">
                    <strong>{item.name}</strong>
                    <small>
                      {key === "inter"
                        ? "Compete across colleges"
                        : key === "intra"
                          ? "Show your campus talent"
                          : "Own your next challenge"}
                    </small>
                  </span>
                  <span className="division-arrow">↗</span>
                </button>
              ))}
            </section>

            <DeadlineRadar
              events={visibleEvents}
              onSelect={setSelectedEvent}
            />

            <section id="opportunity-list" className="events-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">FIND YOUR NEXT EXPERIENCE</span>
                  <h2>{divisionData.name} opportunities</h2>
                  <p>Choose a challenge. Take the first step.</p>
                </div>
                <span className="result-count">
                  {visibleEvents.length} opportunities
                </span>
              </div>

              <div className="filters">
                <label className="search-field">
                  <span>⌕</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search events, skills or colleges..."
                    aria-label="Search events"
                  />
                </label>

                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Filter by department"
                >
                  <option>All Departments</option>
                  {DEPARTMENTS.filter((item) => item !== "All Departments").map(
                    (item) => <option key={item}>{item}</option>,
                  )}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort events"
                >
                  <option value="deadline">Soonest deadline</option>
                  <option value="eventDate">Earliest event date</option>
                </select>
              </div>

              {visibleEvents.length ? (
                <div className="event-grid">
                  {visibleEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      saved={savedIds.includes(event.id)}
                      onSave={toggleSave}
                      onSelect={setSelectedEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span>✦</span>
                  <h3>Your next opportunity is waiting to be listed.</h3>
                  <p>Try another department or search term.</p>
                </div>
              )}
            </section>
          </>
        )}

        {page === "My Tickets" && (
          <section className="page-section">
            <span className="eyebrow">YOUR PERSONAL OPPORTUNITY LIST</span>
            <h1>My Tickets<span className="heading-period">.</span></h1>
            <p className="page-description">
              Keep your favourite competitions close and their deadlines in sight.
            </p>
            {savedEvents.length ? (
              <div className="event-grid">
                {savedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    saved
                    onSave={toggleSave}
                    onSelect={setSelectedEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>♡</span>
                <h3>Make room for your next achievement.</h3>
                <p>Save an opportunity from Find Events to see it here.</p>
                <button className="primary-button" onClick={() => setPage("Find Events")}>
                  Explore events
                </button>
              </div>
            )}
          </section>
        )}

        {page === "Post an Event" && (
          <PostEventForm role={role} onSubmit={submitEvent} />
        )}

        {page === "Approvals" && (
          <section className="page-section">
            <span className="eyebrow">KEEP OPPORTUNITIES TRUSTWORTHY</span>
            <h1>Approval queue<span className="heading-period">.</span></h1>
            <p className="page-description">
              Review event submissions before they become visible to students.
            </p>

            <div className="approval-policy">
              <div><strong>Inter-college</strong><span>Authorized HOD, tutor or class representative</span></div>
              <div><strong>Intra-college</strong><span>Designated class tutor / authorized HOD</span></div>
              <div><strong>Sports</strong><span>Physical Director / designated coach</span></div>
            </div>

            {pendingEvents.length ? (
              <div className="pending-list">
                {pendingEvents.map((event) => (
                  <article className="pending-card" key={event.id}>
                    <span className="pending-badge">Pending review</span>
                    <h3>{event.title}</h3>
                    <p>{DIVISIONS[event.division].name} · {event.department}</p>
                    <p>Submitted by: {event.submittedByRole}</p>
                    {event.brochureUrl && (
                      <a href={event.brochureUrl} target="_blank" rel="noreferrer">
                        Preview brochure ↗
                      </a>
                    )}
                    <div className="pending-actions">
                      <button className="approve-button" onClick={() => approveEvent(event.id)}>
                        Approve
                      </button>
                      <button className="reject-button" onClick={() => rejectEvent(event.id)}>
                        Reject
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>✓</span>
                <h3>No submissions waiting for review.</h3>
                <p>New event submissions will appear here in this demonstration.</p>
              </div>
            )}
            <p className="demo-warning">
              Demonstration only: the selected role is not authenticated.
              Do not use this browser-only approval queue to publish real college events.
            </p>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">CampusEvents<span>.</span></div>
        <p>Discover. Participate. Achieve.</p>
        <small>Built to bring every campus opportunity closer.</small>
      </footer>

      <EventDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSave={toggleSave}
        saved={selectedEvent ? savedIds.includes(selectedEvent.id) : false}
      />
    </div>
  );
}

export default App;

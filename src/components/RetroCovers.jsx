import { useEffect, useState } from 'react'
import { TbAward } from 'react-icons/tb'
import RetroCover from './RetroCover'

/* Card-specific covers built on RetroCover. Numbers marked DEMO are illustrative only. */

const rows = (on) => (i) => (i === on ? 'pip-row pip-row-active' : 'pip-row')

/* ── Thanzi · amber handheld ─────────────────────────────────────────────── */
const KG = 70, CM = 170, AGE = 25
const BMR = Math.round(10 * KG + 6.25 * CM - 5 * AGE + 5)        // Mifflin-St Jeor, male
const BMI = (KG / ((CM / 100) ** 2)).toFixed(1)
const LEVELS = [['SED', 1.2], ['LIGHT', 1.375], ['ACTIVE', 1.55]]
const RING = 2 * Math.PI * 42
const MEALS = [['BREAKFAST', 420], ['LUNCH', 650], ['SNACK', 180], ['DINNER', 560]]
const WEEK = [['MON', 78], ['TUE', 92], ['WED', 64], ['THU', 88], ['FRI', 71], ['SAT', 95], ['SUN', 58]]

function ThanziCalc() {
  const [lvl, setLvl] = useState(1)
  const tdee = Math.round(BMR * LEVELS[lvl][1])
  const dash = Math.min(tdee / 3000, 1) * RING
  return (
    <div className="pip-calc">
      <div className="pip-calc-main">
        <div className="pip-ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="pip-ring-track" cx="50" cy="50" r="42" />
            <circle className="pip-ring-fill" cx="50" cy="50" r="42"
              strokeDasharray={`${dash} ${RING}`} transform="rotate(-90 50 50)" />
          </svg>
          <div className="pip-ring-text"><b>{tdee}</b><span>TDEE KCAL</span></div>
        </div>
        <div className="pip-kv">
          <div><span>BMI</span><b>{BMI}</b></div>
          <div><span>BMR</span><b>{BMR}</b></div>
          <small>DEMO {KG}KG · {CM}CM · {AGE}Y</small>
        </div>
      </div>
      <div className="pip-seg" role="group" aria-label="Activity level">
        {LEVELS.map(([name], i) => (
          <button key={name} type="button" className={i === lvl ? 'pip-seg-on' : ''} onClick={() => setLvl(i)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

function ThanziDiary() {
  const [on, setOn] = useState([true, true, false, false])
  const total = MEALS.reduce((s, [, k], i) => s + (on[i] ? k : 0), 0)
  const target = Math.round(BMR * 1.375)
  return (
    <div className="pip-diary">
      <ul className="pip-list pip-list--tall">
        {MEALS.map(([n, k], i) => (
          <li key={n}>
            <button type="button" className={on[i] ? 'pip-row pip-row-active' : 'pip-row'}
              onClick={() => setOn((p) => p.map((v, j) => (j === i ? !v : v)))}>
              <span>{on[i] ? '[X]' : '[ ]'} {n}</span><span>{k} KCAL</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="pip-meter"><div className="pip-meter-fill" style={{ width: `${Math.min(total / target, 1) * 100}%` }} /></div>
      <div className="pip-meter-text"><span>{total} KCAL</span><span>TARGET {target}</span></div>
    </div>
  )
}

function ThanziTrend() {
  const [sel, setSel] = useState(5)
  return (
    <div className="pip-trend">
      <div className="pip-bars">
        {WEEK.map(([d, h], i) => (
          <button key={d} type="button" className={i === sel ? 'pip-col pip-col-on' : 'pip-col'}
            onClick={() => setSel(i)} aria-label={`${d} ${h * 25} kcal`}>
            <span className="pip-col-track">
              <span className="pip-col-bar" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
            </span>
            <span className="pip-col-day">{d[0]}</span>
          </button>
        ))}
      </div>
      <div className="pip-meter-text"><span>{WEEK[sel][0]} · {WEEK[sel][1] * 25} KCAL</span><span>DEMO DATA</span></div>
    </div>
  )
}

const THANZI_TABS = [
  { id: 'calc', label: 'CALC', title: 'THANZI_CALC' },
  { id: 'diary', label: 'DIARY', title: 'MEAL_DIARY' },
  { id: 'trend', label: 'TREND', title: 'WEEK_TREND' },
]

export function ThanziCover() {
  return (
    <RetroCover tone="amber" variant="handheld" tabs={THANZI_TABS} label="Thanzi preview"
      stats={[['BMI', BMI], ['BMR', BMR]]}>
      {(tab) => (tab === 'calc' ? <ThanziCalc /> : tab === 'diary' ? <ThanziDiary /> : <ThanziTrend />)}
    </RetroCover>
  )
}

/* ── DietitianOS · cyan tablet ───────────────────────────────────────────── */
const PATIENTS = [
  ['PT-001', 'ADULT', 'RENAL', 'FOLLOW-UP'],
  ['PT-002', 'PAEDS', 'GROWTH', 'NEW'],
  ['PT-003', 'ADULT', 'DIABETES', 'REVIEW'],
  ['PT-004', 'ADULT', 'ENTERAL', 'ACTIVE'],
]
const VISITS = [['08:30', 'PT-001', 'REVIEW'], ['10:00', 'PT-002', 'INTAKE'], ['11:30', 'PT-003', 'FOLLOW-UP'], ['14:00', 'PT-004', 'REPORT']]
const REPORT_BARS = [['WEIGHT', 72], ['INTAKE', 58], ['LABS', 86], ['FOLLOW-UP', 44]]

function Patients() {
  const [sel, setSel] = useState(0)
  const [, type, focus, status] = PATIENTS[sel]
  return (
    <div className="pip-split">
      <ul className="pip-list pip-list--tall">
        {PATIENTS.map(([id], i) => (
          <li key={id}>
            <button type="button" className={rows(sel)(i)} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
              <span>{id}</span><span>›</span>
            </button>
          </li>
        ))}
      </ul>
      <dl className="pip-detail" key={sel}>
        <dt>TYPE</dt><dd>{type}</dd>
        <dt>FOCUS</dt><dd>{focus}</dd>
        <dt>STATUS</dt><dd>{status}</dd>
      </dl>
    </div>
  )
}

function Visits() {
  const [done, setDone] = useState([true, false, false, false])
  const count = done.filter(Boolean).length
  return (
    <div className="pip-visits">
      <ol className="pip-timeline">
        {VISITS.map(([t, id, what], i) => (
          <li key={t}>
            <button type="button" className={done[i] ? 'pip-visit pip-visit-done' : 'pip-visit'}
              onClick={() => setDone((p) => p.map((v, j) => (j === i ? !v : v)))}>
              <span className="pip-dot" />
              <span>{t}</span><span>{id} · {what}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="pip-meter-text"><span>{count}/{VISITS.length} DONE</span><span>TAP TO TOGGLE</span></div>
    </div>
  )
}

function Reports() {
  const [run, setRun] = useState(0)
  return (
    <div className="pip-reports">
      <div className="pip-hbars" key={run}>
        {REPORT_BARS.map(([n, v], i) => (
          <div key={n} className="pip-hbar">
            <span>{n}</span>
            <span className="pip-hbar-track">
              <span className="pip-hbar-fill" style={{ width: `${v}%`, animationDelay: `${i * 90}ms` }} />
            </span>
            <b>{v}%</b>
          </div>
        ))}
      </div>
      <button type="button" className="pip-action" onClick={() => setRun((r) => r + 1)}>
        {run === 0 ? '▶ GENERATE REPORT' : '✔ READY · RERUN'}
      </button>
    </div>
  )
}

const DIETITIAN_TABS = [
  { id: 'patients', label: 'PATIENTS', title: 'PATIENTS' },
  { id: 'visits', label: 'VISITS', title: 'TODAY' },
  { id: 'reports', label: 'REPORTS', title: 'REPORTS' },
]

export function DietitianCover() {
  return (
    <RetroCover tone="cyan" variant="tablet" tabs={DIETITIAN_TABS} label="DietitianOS preview"
      stats={[['MODE', 'DEMO']]}>
      {(tab) => (tab === 'patients' ? <Patients /> : tab === 'visits' ? <Visits /> : <Reports />)}
    </RetroCover>
  )
}

/* ── Chakudya · violet slab (real API response from the Projects page demo) ── */
const CMD = 'curl api.chakudya.xyz/foods?search=nsima'
const JSON_OUT = `{
  "food_name": "Nsima ya kondowole",
  "category": "Staples",
  "kcal": 160,
  "protein_g": 1,
  "carbs_g": 37
}`
const DATASETS = [['Foods', 'FOOD'], ['Exchange lists', 'EXCH'], ['Renal foods', 'RENAL'], ['Enteral formulas', 'ENT'], ['RAG search', 'RAG']]

function TypedQuery() {
  const [n, setN] = useState(() =>
    (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? CMD.length : 0))
  useEffect(() => {
    if (n >= CMD.length) return undefined
    const id = setTimeout(() => setN(n + 1), 38)
    return () => clearTimeout(id)
  }, [n])
  const finished = n >= CMD.length
  return (
    <div className="pip-term">
      <div className="pip-term-cmd">$ {CMD.slice(0, n)}{!finished && <span className="pip-blink">▌</span>}</div>
      {finished && <pre className="pip-term-out">{JSON_OUT}</pre>}
    </div>
  )
}

function Datasets() {
  const [sel, setSel] = useState(0)
  return (
    <div>
      <ul className="pip-list pip-list--tall">
        {DATASETS.map(([name, tag], i) => (
          <li key={name}>
            <button type="button" className={rows(sel)(i)} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
              <span>{name}</span><span>{tag}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="pip-meter-text"><span>POWERS THANZI + OASIS</span></div>
    </div>
  )
}

function Award() {
  return (
    <div className="pip-award">
      <div className="pip-block"><div className="pip-big">2<small>ND</small></div></div>
      <div className="pip-award-line"><TbAward size={14} /> BEST INNOVATION</div>
      <div className="pip-date">OPEN NUTRITION DATA API · MALAWI</div>
    </div>
  )
}

const CHAKUDYA_TABS = [
  { id: 'query', label: 'QUERY', title: 'API_QUERY' },
  { id: 'data', label: 'DATA', title: 'DATASETS' },
  { id: 'award', label: 'AWARD', title: 'RECOGNITION' },
]

export function ChakudyaCover() {
  return (
    <RetroCover tone="violet" variant="slab" tabs={CHAKUDYA_TABS} label="Chakudya preview"
      stats={[['API', 'LIVE']]}>
      {(tab) => (tab === 'query' ? <TypedQuery /> : tab === 'data' ? <Datasets /> : <Award />)}
    </RetroCover>
  )
}

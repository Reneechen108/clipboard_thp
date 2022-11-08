const { deterministicPartitionKey } = require('./dpk');

console.log(deterministicPartitionKey());

const Facilities = [
  {
    id: 1,
    name: 'school1',
    members: [1, 2, 3],
  },
];

const Agents = [
  {
    id: 1,
    name: 'John',
    shifts: [1, 3],
  },
  {
    id: 2,
    name: 'Emily',
    shifts: [2, 3],
  },
  {
    id: 3,
    name: 'Jack',
    shifts: [2, 3],
  },
];
const Shifts = [
  {
    id: 1,
    quarter: 1,
    start: 9,
    end: 18,
  },
  {
    id: 2,
    quarter: 2,
    start: 10,
    end: 19,
  },
  {
    id: 3,
    quarter: 3,
    start: 7,
    end: 17,
  },
];

// enerate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked.
// acceptance criteria, time/effort estimates, and implementation details

// Task 1: get the Facility's id to fetch the facility from db, and get its member list, then base on the menber ids to get their shifts, and use those shifts
// use the start and end time to calculate how many hours needs to work each quarter and sum them up
// getShiftsByFacility, input: 1 => 6 shifts or
// [
//  {user: 1, shifts: [{quarter: 1, start:9, end:18}, {quarter: 2, start:10, end:19}]},
//  {user: 2, shifts: [{quarter: 2, start:10, end:19}, {quarter: 3, start:7, end:17}]}
//  {user: 3, shifts: [{quarter: 1, start:9, end:18}, {quarter: 3, start:7, end:17}]}
// ]

const getShiftsByFacility = facility_id => {
  const member_list = Facilities.find(v => v.id == facility_id).members;
  let shifts = [];
  for (let user of member_list) {
    shifts.push(Agents.find(v => v.id == user).shifts);
  }
  let res = [];
  for (let shift of shifts) {
    let s_detail = [];
    for (let s of shift) {
      s_detail.push(Shifts.find(v => v.id == s));
    }
    res.push(s_detail);
  }
  return res;
};

const shift_set = getShiftsByFacility(1);
// Task 2: generateReport, base on the list of shifts we can get how many hours that they work every day in specific quarter,
// use the end - start to get daily working hour
// generateReport, input: [
// [{quarter: 1, start:9, end:18}, {quarter: 2, start:10, end:19}],
// [{quarter: 2, start:10, end:19}, {quarter: 3, start:7, end:17}],
// [{quarter: 1, start:9, end:18}, {quarter: 3, start:7, end:17}],
// 3 shifts sets, (9+10/2 + 9+10/2 + 9+10/2) / 3 => 9.5

const generateReport = user_shifts => {
  let all_member_hour = 0;
  for (let shift of user_shifts) {
    let total = 0;
    let count = 0;
    for (let s of shift) {
      count += 1;
      total += s.end - s.start;
    }
    all_member_hour += total / count;
  }
  return all_member_hour / user_shifts.length;
};

avg = generateReport(shift_set);
// Task 3: generateAgentReport, each Agent they work with and use that id when generating reports for them.
// We can combine the Facility's id that they currently in with their internal id, like Emily are 1-2 and Jack are 1-3
// base on this we can use the split funciton to get the facility's if can call getShiftsByFacility function then get the list of agents
// filter the agents list with the target agent id like Emily works [{quarter: 2, start:10, end:19}, {quarter: 3, start:7, end:17}]
// show it to the report

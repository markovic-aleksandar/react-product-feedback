const categories = [
  {
    id: 1,
    name: 'all',
    label: 'All'
  },
  {
    id: 2,
    name: 'ui',
    label: 'UI'
  },
  {
    id: 3,
    name: 'ux',
    label: 'UX'
  },
  {
    id: 4,
    name: 'enhancement',
    label: 'Enhancement'
  },
  {
    id: 5,
    name: 'bug',
    label: 'Bug'
  },
  {
    id: 6,
    name: 'feature',
    label: 'Feature'
  }
];

const feedbackStatuses = [
  {
    name: 'suggestion',
    label: 'Suggestion',
    desc: null,
    color: null
  },
  {
    name: 'planned',
    label: 'Planned',
    desc: 'Ideas prioritized for research',
    color: '#f49f85'
  },
  {
    name: 'in-progress',
    label: 'In-Progress',
    desc: 'Currently being developed',
    color: '#ad1fea'
  },
  {
    name: 'live',
    label: 'Live',
    desc: 'Released features',
    color: '#62befa'
  }
];

export default {
  categories,
  feedbackStatuses
}
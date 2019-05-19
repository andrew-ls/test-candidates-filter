/*
 * Modifications copyright (c) 2019 Andrew Steel <copyright@andrewsteel.net>
*/

const newCandidates = [
	{ name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
	{ name: "Mario", skills: ["Python", "AWS"] },
	{ name: "Jacquline", skills: ["JavaScript", "Azure"] },
	{ name: "Kathy", skills: ["JavaScript", "Java"] },
	{ name: "Anna", skills: ["JavaScript", "AWS"] },
	{ name: "Matt", skills: ["PHP", "AWS"] },
	{ name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

function addCandidatesToTable (table, candidates)
{
	candidates.forEach((candidate) => (
		insertCandidate(table, candidate.name, candidate.skills)
	));
}

function filterCandidateBySkill (candidates, skillFilter)
{
	return candidates.filter((candidate) => (
		candidate.skills.find((skill) => (
			skill.match(new RegExp(`.*${skillFilter}.*`, "i"))
		))
	));
}

function insertCandidate (tbody, name, skills)
{
	const newRow = tbody.insertRow();
	const nameCell = newRow.insertCell();
	const skillCell = newRow.insertCell();

	const candidateName = document.createTextNode(name);
	const candidateSkills = document.createTextNode(skills.join(", "));

	nameCell.appendChild(candidateName);
	skillCell.appendChild(candidateSkills);
}

function mountBody ()
{
	const candidatesTable = document.getElementById("candidates_example");
	const newCandidatesTable = candidatesTable.cloneNode(true);

	removeRowsFromTable(newCandidatesTable);
	const newTbody = newCandidatesTable.getElementsByTagName("tbody")[0];

	const filteredCandidates = filterCandidateBySkill(
		newCandidates,
		"JavaScript"
	);
	addCandidatesToTable(newTbody, filteredCandidates);

	document.body.appendChild(newCandidatesTable);
}

function removeRowsFromTable (table)
{
	const rows = table.getElementsByTagName("tr");

	while (rows.length > 1) {
		table.deleteRow(1);
	}
}

(document.readyState === "loading")
	? document.addEventListener("DOMContentLoaded", mountBody)
	: mountBody();

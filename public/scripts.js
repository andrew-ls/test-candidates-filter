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

function constructCandidatesTable (candidates)
{
	const table = document.createElement("table");
	table.setAttribute("class", "candidates");

	const table_head = table.createTHead().insertRow();
	const table_head_col1 = table_head.appendChild(
		document.createElement("th")
	);
	table_head_col1.innerHTML = "Name";
	const table_head_col2 = table_head.appendChild(
		document.createElement("th")
	);
	table_head_col2.innerHTML = "Skills";

	const table_body = table.appendChild(document.createElement("tbody"));

	candidates.forEach((candidate) => {
		const row = table_body.insertRow();
		const row_col1 = row.appendChild(document.createElement("td"));
		row_col1.innerHTML = candidate.name;
		const row_col2 = row.appendChild(document.createElement("td"));
		row_col2.innerHTML = candidate.skills.join(", ");
	});

	return table;
}

function mountBody ()
{
	const candidatesTable = constructCandidatesTable(newCandidates);
	const newCandidatesTable = candidatesTable.cloneNode(true);

	removeRowsFromTable(newCandidatesTable);
	const newTbody = newCandidatesTable.getElementsByTagName("tbody")[0];

	const filteredCandidates = filterCandidateBySkill(
		newCandidates,
		"JavaScript"
	);
	addCandidatesToTable(newTbody, filteredCandidates);

	document.body.insertBefore(
		candidatesTable,
		document.getElementById("heading-candidates").nextSibling
	);
	document.body.insertBefore(
		newCandidatesTable,
		document.getElementById("heading-candidates-filtered").nextSibling
	);
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

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

class CandidatesTable
{
	constructor (candidates)
	{
		this.element = (() => {
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

			table.appendChild(document.createElement("tbody"));

			return table;
		})();
		this.fill(candidates);
	}

	add (name, skills)
	{
		const row = this.element.getElementsByTagName("tbody")[0]
			.insertRow();
		row.insertCell()
			.appendChild(document.createTextNode(name));
		row.insertCell()
			.appendChild(document.createTextNode(skills.join(", ")));
	}

	clear ()
	{
		const rows = this.element.getElementsByTagName("tr");
		while (rows.length > 1) {
			this.element.deleteRow(1);
		}
	}

	fill (candidates)
	{
		this.clear();
		candidates.forEach((candidate) => {
			this.add(candidate.name, candidate.skills);
		});
	}
}

function filterCandidateBySkill (candidates, skillFilter)
{
	return candidates.filter((candidate) => (
		candidate.skills.find((skill) => (
			skill.match(new RegExp(`.*${skillFilter}.*`, "i"))
		))
	));
}

function mountBody ()
{
	const candidatesTable = new CandidatesTable(newCandidates);
	const newCandidatesTable = new CandidatesTable(newCandidates);

	const filteredCandidates = filterCandidateBySkill(
		newCandidates,
		"JavaScript"
	);
	newCandidatesTable.fill(filteredCandidates);

	document.body.insertBefore(
		candidatesTable.element,
		document.getElementById("heading-candidates").nextSibling
	);
	document.body.insertBefore(
		newCandidatesTable.element,
		document.getElementById("heading-candidates-filtered").nextSibling
	);
}

(document.readyState === "loading")
	? document.addEventListener("DOMContentLoaded", mountBody)
	: mountBody();

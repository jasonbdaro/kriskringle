import React from 'react'
import {Label} from 'react-bootstrap'

export const seasons_grid_options = {
	schema: {
		model: {
			id: "id",
			fields: {
				id: { type: "string", editable: false },
				name: { type: "string" },
				current: { type: "boolean" },
				lock: { type: "boolean" },
				created_at: { type: "string", editable: false }
			}
		}
	},
	columns: [
	{
		field: "name",
		title: "Name",
	},
	{
		field: "current",
		title: "Current",
		template: props => (
			<span>
				{
					props.current ? (
						<span>
							<Label bsStyle="success">Current</Label>&nbsp;
						</span>
					) : ( null )
				}
			</span>
		),
	},
	{
		field: "lock",
		title: "Lock",
		template: props => (
			<span>
				{
					props.lock ? (
						<span>
							<Label bsStyle="danger">Locked</Label>&nbsp;
						</span>
					) : ( null )
				}
			</span>
		)
	},
	{
		field: "created_at",
		title: "Date"
	},
	{
		command: ['edit', 'destroy'],
		title: ''
	}],
	toolbar: ['create', 'save', 'cancel'],
	dataSource: {
		read: {
			url: 'seasons',
			complete: response => {
				console.log(response)
			}
		},
		create: {
			url: 'create-season',
			complete: response => {
				console.log(response)
			}
		},
		update: {
			url: 'update-season',
			complete: response => {
				console.log(response)
			}
		},
		destroy: {
			url: 'destroy-season',
			complete: response => {
				console.log(response)
			}
		},
	},
	pagination: {
		items: 5,
		maxButtons: 3
	},
}
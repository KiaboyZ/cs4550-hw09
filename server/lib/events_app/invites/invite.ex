defmodule EventsApp.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :email, :string
    field :response, :string
    
    belongs_to :event, EventsApp.Events.Event

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:email, :response, :event_id])
    |> validate_required([:email, :response, :event_id])
  end
end

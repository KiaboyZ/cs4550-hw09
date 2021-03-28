# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsApp.Repo.insert!(%EventsApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsApp.Repo
alias EventsApp.Users.User
alias EventsApp.Events.Event

defmodule Inject do

  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt("pass")
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end

  def event(user_id, name, time, description) do
    Repo.insert!(%Event{user_id: user_id, name: name, time: time, description: description})
  end

end

alice = Inject.user("Alice", "alice@gmail.com", "test1")
bob = Inject.user("Bob", "bob@gmail.com","test2")

time_ex = DateTime.utc_now()
|> DateTime.truncate(:second)

slumby = Inject.event(alice.id, "Slumby P", time_ex, "come sleep over")
rave = Inject.event(bob.id, "Big Boy Party Rave", time_ex,"get your rave on")